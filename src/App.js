import React from 'react';
import './App.css';
import Router from "./components/Router"
import lzString from 'lz-string';

const logo = `${process.env.PUBLIC_URL || ''}/assets/RacketsCross.png`; //needed for gh-pages as in index.html

export const flightGeneration = Object.freeze({
  FIXED: 1,
  SHUFFLED: 2
});

class App extends React.Component {


  state = {
    players: [],
    numPlayers: 0,
    bracket: [],
    games:[],
    CurrentGame:-1,
  }

  flightTypeRef = React.createRef(flightGeneration.SHUFFLED);

  setFlightType = (type) => {
    this.flightTypeRef.current = type;
    console.log("Flight type set to: " + type);
  };

  addPlayer = player => {
    this.setState({players: [...this.state.players, player]});
  }

  removePlayer = index => {
    console.log(this.state.players)
    this.setState((prevState) => ({
       players : prevState.players.filter((_,i) => i !== index)
      }));
  }
  saveTimer = null;

  componentDidUpdate(prevProps, prevState) {
    // Clear the previous timer if an update happens within 400ms
    if (this.saveTimer) clearTimeout(this.saveTimer);
    
    // Set a new timer to write everything at once
    this.saveTimer = setTimeout(() => {
      localStorage.setItem('tennisAppState', JSON.stringify(this.state));
      if (this.props.location) {
        localStorage.setItem('lastRoute', this.props.location.pathname);
      }
    }, 400);
  }

  componentWillUnmount() {
    // Cleanup to prevent memory leaks if the component unmounts
    if (this.saveTimer) clearTimeout(this.saveTimer);
  }
  
  componentDidMount() {
    /*
    Called once, immediately after the component is mounted (inserted into the DOM),
    after the first render()
    Perfect for: Initializing things that need DOM access, fetching data, subscribing to events, setting up timers, or loading from localStorage
    */
    // Check for shared state in URL query params first
    const urlParams = new URLSearchParams(this.props.location.search);
    const sharedState = urlParams.get('state');
    console.log('componentDidMount - location.search:', this.props.location.search);
    console.log('componentDidMount - sharedState exists:', !!sharedState);
    if (sharedState) {
      console.log('componentDidMount - sharedState length:', sharedState.length);
      const parsed = this.deserializeState(sharedState);
      console.log('componentDidMount - parsed state:', parsed);
      if (parsed && window.confirm('Load shared game? This will replace any current game.')) {
        this.setState(parsed, () => {
          // Recalculate scores as in localStorage restore
          const recalculated = this.state.players.map(p => ({ ...p, Score: 0 }));
          this.state.games.forEach(game => {
            if (game.Winner === 1) {
              const s = recalculated.find(x => x.Name === game.Server.Name);
              const t = recalculated.find(x => x.Name === game.TeamMate.Name);
              if (s) s.Score++;
              if (t) t.Score++;
            } else if (game.Winner === 2) {
              const o1 = recalculated.find(x => x.Name === game.Opp1.Name);
              const o2 = recalculated.find(x => x.Name === game.Opp2.Name);
              if (o1) o1.Score++;
              if (o2) o2.Score++;
            }
          });
          const updatedGames = parsed.games.map(game => {
            const findScore = name => {
              const p = recalculated.find(p => p.Name === name);
              return p ? p.Score : 0;
            };
            return {
              ...game,
              Server: { ...game.Server, Score: findScore(game.Server.Name) },
              TeamMate: { ...game.TeamMate, Score: findScore(game.TeamMate.Name) },
              Opp1: { ...game.Opp1, Score: findScore(game.Opp1.Name) },
              Opp2: { ...game.Opp2, Score: findScore(game.Opp2.Name) }
            };
          });
          this.setState({ players: recalculated, games: updatedGames }, () => {
            // Navigate to games page to display the shared games
            this.props.history.push('/games');
          });
        });
        return; // Skip localStorage check if loaded from URL
      }
    }

    // If no shared state or declined, check localStorage
    const savedState = localStorage.getItem('tennisAppState');
    const lastRoute = localStorage.getItem('lastRoute') || '/';
    
    console.log('componentDidMount - savedState exists:', !!savedState);
    console.log('componentDidMount - lastRoute:', lastRoute);
 
    if (savedState) {
      if (window.confirm('Continue last game? Click Cancel to start a new game.')) {
        const parsed = JSON.parse(savedState);
        this.setState(parsed, () => {
          // ensure player total scores agree with game data
          const recalculated = this.state.players.map(p => ({ ...p, Score: 0 }));
          this.state.games.forEach(game => {
            if (game.Winner === 1) {
              const s = recalculated.find(x => x.Name === game.Server.Name);
              const t = recalculated.find(x => x.Name === game.TeamMate.Name);
              if (s) s.Score++;
              if (t) t.Score++;
            } else if (game.Winner === 2) {
              const o1 = recalculated.find(x => x.Name === game.Opp1.Name);
              const o2 = recalculated.find(x => x.Name === game.Opp2.Name);
              if (o1) o1.Score++;
              if (o2) o2.Score++;
            }
          });
          // update both players and game participant scores
          const updatedGames = parsed.games.map(game => {
            const findScore = name => {
              const p = recalculated.find(p => p.Name === name);
              return p ? p.Score : 0;
            };
            return {
              ...game,
              Server: { ...game.Server, Score: findScore(game.Server.Name) },
              TeamMate: { ...game.TeamMate, Score: findScore(game.TeamMate.Name) },
              Opp1: { ...game.Opp1, Score: findScore(game.Opp1.Name) },
              Opp2: { ...game.Opp2, Score: findScore(game.Opp2.Name) }
            };
          });
          this.setState({ players: recalculated, games: updatedGames }, () => {
            console.log('state after restore:', this.state);
            if (lastRoute && lastRoute !== '/') {
              this.props.history.push(lastRoute);
            }
          });
        });
      } else {
        localStorage.removeItem('tennisAppState');
        localStorage.removeItem('lastRoute');
      }
    }
  }

  getRoundOrig = (matrix, shiftAry, inside, outside) => {
    var i;
    var games = []
    for(i=0 ; i < matrix.length;i++) {
        var game = {
          Server: matrix[0][i],
          Bench: matrix[1][i],
          TeamMate: matrix[shiftAry[0]][i],
          Opp1: matrix[shiftAry[1]][i],
          Opp2: matrix[shiftAry[2]][i],
          Winner: 0,
          InSide: inside,
          OutSide: outside
        }
        games.push(game);
    }
    return games
  }
  getRound = (matrix, shiftAry, inside, outside) => {
    var i;
    var games = []
    for(i=0 ; i < matrix.length;i++) {
        var game = {
          Server: matrix[i][0],
          Bench: matrix[i][1],
          TeamMate: matrix[i][shiftAry[0]],
          Opp1: matrix[i][shiftAry[1]],
          Opp2: matrix[i][shiftAry[2]],
          Winner: 0,
          InSide: inside,
          OutSide: outside
        }
        games.push(game);
    }
    return games
  }

  shuffle = (array) => {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array
  }

  rippleSort = (array, modulus) => {
    let startIndex = modulus %2;
    for(let i = startIndex; i+1 < array.length; i+=2) {
        let temp = array[i];
        array[i] = array[i+1];
        array[i+1] = temp;
    }
    return array
  }

  playerRotation = (players) => {

    var i;
    var b = []
    for(i=0 ; i<this.state.players.length;i++) {
      b.push(players)
      players = [...players]
      players.push(players.shift()); // get the first element and push it to the end of the array
    }
    this.setState({bracket: b});
    return b
  }

  startGame = () => {
    localStorage.removeItem('tennisAppState'); // Clear previous state

    var flights = []

    var players = [...this.state.players]  // a 5 man array
    players = this.shuffle(players) //randomize players and create the bracket rotation
    var bracket = this.playerRotation(players); // 5 arrays of 5 players each
    flights = flights.concat(this.getRound(bracket,[2,3,4],'North', 'South'))
    flights = flights.concat(this.getRound(bracket,[2,3,4], 'South', 'North')) 
    if(this.flightTypeRef.current === flightGeneration.SHUFFLED) {
      console.log("User elected the shuffled games so ripple sort")
      players = this.rippleSort(players,2) //deterministic sort swapping players starting at 1 to get server serving to last bench guy (even servers)
      bracket = this.playerRotation(players); 
      flights = flights.concat(this.getRound(bracket,[3,4,2],'North', 'South'))
      flights = flights.concat(this.getRound(bracket,[4,2,3], 'South', 'North')) //was 324. swap next round here to even opponents over 20 games in case we quit early
    } else {
      flights = flights.concat(this.getRound(bracket,[3,2,4],'North', 'South'))
      flights = flights.concat(this.getRound(bracket,[3,4,2], 'South', 'North'))
    }
    if(this.flightTypeRef.current === flightGeneration.SHUFFLED) {
      flights = flights.concat(this.getRound(bracket,[3,4,2],'North', 'South')) 
      flights = flights.concat(this.getRound(bracket,[4,2,3], 'South', 'North')) 
    } else {
      flights = flights.concat(this.getRound(bracket,[4,2,3],'North', 'South'))
      flights = flights.concat(this.getRound(bracket,[4,3,2], 'South', 'North'))
    }

    this.setState({games:flights, CurrentGame:0})


    console.log(flights);
  }

  resetGame = () => {
    localStorage.removeItem('tennisAppState');
    localStorage.removeItem('lastRoute');
    this.setState({
      players: [],
      numPlayers: 0,
      bracket: [],
      games: [],
      CurrentGame: -1
    });
  }

  serializeState = () => {
    // Create a compact version to keep < query string limits 
    // std http limits are 2048 so keeping short works on all platforms without needing a backend.
    // My test reduced 3500 to 1500 chars for state object
    // : use player indices instead of full objects
    const playerMap = {};
    this.state.players.forEach((p, i) => playerMap[p.Name] = i);
    
    const compactGames = this.state.games.map(game => ({
      s: playerMap[game.Server.Name], // server index
      ss: game.Server.Score,
      t: playerMap[game.TeamMate.Name], // teamMate index
      ts: game.TeamMate.Score,
      o1: playerMap[game.Opp1.Name], // opp1 index
      o1s: game.Opp1.Score,
      o2: playerMap[game.Opp2.Name], // opp2 index
      o2s: game.Opp2.Score,
      b: playerMap[game.Bench.Name], // bench index
      w: game.Winner,
      i: game.InSide,
      o: game.OutSide
    }));
    
    const stateToShare = {
      players: this.state.players,
      games: compactGames,
      CurrentGame: this.state.CurrentGame,
      bracket: this.state.bracket // can compact this too if needed
    };
    const json = JSON.stringify(stateToShare);
    return lzString.compressToEncodedURIComponent(json);
  }

  deserializeState = (compressed) => {
    try {
      const json = lzString.decompressFromEncodedURIComponent(compressed);
      if (!json) return null; // Guard against empty decompression
      
      const parsed = JSON.parse(json);
      
      // Validate core skeleton to prevent crashes
      if (!parsed || typeof parsed !== 'object') return null;
      if (!Array.isArray(parsed.players) || !Array.isArray(parsed.games)) return null;

      // Ensure CurrentGame is a valid number
      parsed.CurrentGame = typeof parsed.CurrentGame === 'number' ? parsed.CurrentGame : -1;
      
      // Reconstruct full game objects from compact format
      parsed.games = parsed.games.map(game => {
        // Safe getter that prevents "Cannot read property of undefined"
        const getPlayer = (index) => {
          const player = parsed.players[index];
          return player && player.Name ? player : { Name: 'Unknown' };
        };
        
        return {
          Server: { Name: getPlayer(game.s).Name, Score: game.ss || 0 },
          TeamMate: { Name: getPlayer(game.t).Name, Score: game.ts || 0 },
          Opp1: { Name: getPlayer(game.o1).Name, Score: game.o1s || 0 },
          Opp2: { Name: getPlayer(game.o2).Name, Score: game.o2s || 0 },
          Bench: { Name: getPlayer(game.b).Name },
          Winner: game.w || 0,
          InSide: game.i || false,
          OutSide: game.o || false
        };
      });
      
      return parsed;
    } catch (e) {
      console.error('Failed to deserialize state:', e);
      return null;
    }
  }

  shareGame = () => {
    const compressed = this.serializeState();
    // Always use the app root path, not the current page path
    //const appRoot = window.location.href.split('?')[0].replace(/\/[^\/]*\/?$/, '/');
    const appRoot = window.location.href.split('?')[0].replace(new RegExp('/[^/]*/?$'), '/');
    const url = appRoot + '?state=' + compressed;
    
    // Try Web Share API first (great for mobile)
    if (navigator.share) {
      navigator.share({
        // title: 'Tennis Game', //remove so messaging apps will inspect the url only and not try to build a "readable" msg
        // text: 'Check out this tennis game!',
        url: url
      }).catch(() => {
        // If share fails, fall back to clipboard or manual copy
        this.fallbackCopy(url);
      });
    } else {
      this.fallbackCopy(url);
    }
  }

  fallbackCopy = (url) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        alert('Game link copied to clipboard!');
      }).catch(() => {
        this.manualCopy(url);
      });
    } else {
      this.manualCopy(url);
    }
  }

  manualCopy = (url) => {
    // Create a simple dialog for manual copying
    const dialog = document.createElement('div');
    dialog.style.position = 'fixed';
    dialog.style.top = '50%';
    dialog.style.left = '50%';
    dialog.style.transform = 'translate(-50%, -50%)';
    dialog.style.background = 'white';
    dialog.style.padding = '20px';
    dialog.style.border = '1px solid #ccc';
    dialog.style.borderRadius = '5px';
    dialog.style.zIndex = '1000';
    dialog.style.maxWidth = '90%';
    dialog.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    
    const text = document.createElement('div');
    text.textContent = 'Copy this link to share the game:';
    text.style.marginBottom = '10px';
    
    const textarea = document.createElement('textarea');
    textarea.value = url;
    textarea.style.width = '100%';
    textarea.style.height = '80px';
    textarea.style.marginBottom = '10px';
    textarea.readOnly = true;
    textarea.style.resize = 'none';
    textarea.onclick = () => textarea.select(); // Auto-select on click
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.padding = '10px 20px';
    closeButton.style.background = '#ccc';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '3px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = () => document.body.removeChild(dialog);
    
    dialog.appendChild(text);
    dialog.appendChild(textarea);
    dialog.appendChild(closeButton);
    
    document.body.appendChild(dialog);
  }

  winner = (index, inservice, autoadvance) => {
    console.log("winner is " + index + "  " + inservice);
    let games = [...this.state.games];
    let players = [...this.state.players];
    let game = games[index];
    if (index > this.state.CurrentGame) return;

    let adj = 0;
    // undo previous winner if clicking same side again
    if (game.Winner === 1 && inservice) {
      game.Winner = 0;
      game.Server = { ...game.Server, Score: game.Server.Score - 1 };
      game.TeamMate = { ...game.TeamMate, Score: game.TeamMate.Score - 1 };
      const si = players.findIndex(p => p.Name === game.Server.Name);
      const ti = players.findIndex(p => p.Name === game.TeamMate.Name);
      if (si >= 0) players[si] = { ...players[si], Score: players[si].Score - 1 };
      if (ti >= 0) players[ti] = { ...players[ti], Score: players[ti].Score - 1 };
      this.setState({ games, players });
      return;
    }
    if (game.Winner === 2 && !inservice) {
      game.Winner = 0;
      game.Opp1 = { ...game.Opp1, Score: game.Opp1.Score - 1 };
      game.Opp2 = { ...game.Opp2, Score: game.Opp2.Score - 1 };
      const o1i = players.findIndex(p => p.Name === game.Opp1.Name);
      const o2i = players.findIndex(p => p.Name === game.Opp2.Name);
      if (o1i >= 0) players[o1i] = { ...players[o1i], Score: players[o1i].Score - 1 };
      if (o2i >= 0) players[o2i] = { ...players[o2i], Score: players[o2i].Score - 1 };
      this.setState({ games, players });
      return;
    }

    if (game.Winner !== 0) adj = -1;

    if (inservice) {
      game.Winner = 1;
      game.Server = { ...game.Server, Score: game.Server.Score + 1 };
      game.TeamMate = { ...game.TeamMate, Score: game.TeamMate.Score + 1 };
      game.Opp1 = { ...game.Opp1, Score: game.Opp1.Score + adj };
      game.Opp2 = { ...game.Opp2, Score: game.Opp2.Score + adj };

      const si = players.findIndex(p => p.Name === game.Server.Name);
      const ti = players.findIndex(p => p.Name === game.TeamMate.Name);
      const o1i = players.findIndex(p => p.Name === game.Opp1.Name);
      const o2i = players.findIndex(p => p.Name === game.Opp2.Name);
      if (si >= 0) players[si] = { ...players[si], Score: players[si].Score + 1 };
      if (ti >= 0) players[ti] = { ...players[ti], Score: players[ti].Score + 1 };
      if (o1i >= 0) players[o1i] = { ...players[o1i], Score: players[o1i].Score + adj };
      if (o2i >= 0) players[o2i] = { ...players[o2i], Score: players[o2i].Score + adj };
    } else {
      game.Winner = 2;
      game.Server = { ...game.Server, Score: game.Server.Score + adj };
      game.TeamMate = { ...game.TeamMate, Score: game.TeamMate.Score + adj };
      game.Opp1 = { ...game.Opp1, Score: game.Opp1.Score + 1 };
      game.Opp2 = { ...game.Opp2, Score: game.Opp2.Score + 1 };

      const si = players.findIndex(p => p.Name === game.Server.Name);
      const ti = players.findIndex(p => p.Name === game.TeamMate.Name);
      const o1i = players.findIndex(p => p.Name === game.Opp1.Name);
      const o2i = players.findIndex(p => p.Name === game.Opp2.Name);
      if (si >= 0) players[si] = { ...players[si], Score: players[si].Score + adj };
      if (ti >= 0) players[ti] = { ...players[ti], Score: players[ti].Score + adj };
      if (o1i >= 0) players[o1i] = { ...players[o1i], Score: players[o1i].Score + 1 };
      if (o2i >= 0) players[o2i] = { ...players[o2i], Score: players[o2i].Score + 1 };
    }
    if (autoadvance) {
      this.autoAdvance(autoadvance, index);
    }
    this.setState({ games, players });
  }

  nextGame = () => {
    var cur = this.state.CurrentGame+1;
    if(cur >= this.state.games.length) {
      //you are done
      return;
    }
    this.setState({CurrentGame:cur})
  }

  autoAdvance = (auto, index) => {
    var cur = this.state.CurrentGame
    if(index===cur && auto) {
      this.nextGame();
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to RasNewton</h1>
          <h2 className="App-intro"> The '5 player' game planner</h2>
        </header>
        <Router app={this} />
      </div>  
    );
  }
}

export default App;
