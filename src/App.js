import React from 'react';
import './App.css';
import Router from "./components/Router"

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
  componentDidUpdate(prevProps, prevState) {
    //  Called immediately after the second and subsequent render()s (every update)
    localStorage.setItem('tennisAppState', JSON.stringify(this.state));
    // save current route every update (captures route changes from withRouter)
    if (this.props.location) {
      localStorage.setItem('lastRoute', this.props.location.pathname);
    }
  }
  componentDidMount() {
    /*
    Called once, immediately after the component is mounted (inserted into the DOM),
    after the first render()
    Perfect for: Initializing things that need DOM access, fetching data, subscribing to events, setting up timers, or loading from localStorage
    */
    const savedState = localStorage.getItem('tennisAppState');
    const lastRoute = localStorage.getItem('lastRoute') || '/';
    
    console.log('componentDidMount - savedState exists:', !!savedState);
    console.log('componentDidMount - lastRoute:', lastRoute);
 
    if (savedState) {
      if (window.confirm('Continue last game? Click Cancel to start a new game.')) {
        const parsed = JSON.parse(savedState);
        this.setState(parsed, () => {
          if (lastRoute && lastRoute !== '/') {
            this.props.history.push(lastRoute);
          }
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
    flights = flights.concat(this.getRound(bracket,[2,4,3], 'South', 'North'))
    if(this.flightTypeRef.current === flightGeneration.SHUFFLED) {
      console.log("User elected the shuffled games so ripple sort")
      players = this.rippleSort(players,2) //deterministic sort swapping players starting at 1 to get server serving to last bench guy (even servers)
      bracket = this.playerRotation(players); 
      flights = flights.concat(this.getRound(bracket,[4,2,3],'North', 'South'))
      flights = flights.concat(this.getRound(bracket,[3,2,4], 'South', 'North')) //swap next round here to even opponents over 20 games in case we quit early
    } else {
      flights = flights.concat(this.getRound(bracket,[3,2,4],'North', 'South'))
      flights = flights.concat(this.getRound(bracket,[3,4,2], 'South', 'North'))
    }
    if(this.flightTypeRef.current === flightGeneration.SHUFFLED) {
      flights = flights.concat(this.getRound(bracket,[4,3,2],'North', 'South'))
      flights = flights.concat(this.getRound(bracket,[3,4,2], 'South', 'North'))
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

  winner = (index, inservice, autoadvance) => {
    console.log("winner is "+ index+ "  " + inservice)
    var g = [...this.state.games]
    var game = g[index]
    var players = [...this.state.players] // also create a copy of players array
    console.log(this.state.CurrentGame)
    console.log(game)

    if(index > this.state.CurrentGame) return;

    var adj=0

    if(game.Winner === 1 && inservice) {
      //reset the game to no winner
      game.Winner = 0
      game.Server = { ...game.Server, Score: game.Server.Score - 1 }
      game.TeamMate = { ...game.TeamMate, Score: game.TeamMate.Score - 1 }
      // also update in players array
      const serverIdx = players.findIndex(p => p.Name === game.Server.Name)
      const tmIdx = players.findIndex(p => p.Name === game.TeamMate.Name)
      if(serverIdx >= 0) players[serverIdx] = { ...players[serverIdx], Score: players[serverIdx].Score - 1 }
      if(tmIdx >= 0) players[tmIdx] = { ...players[tmIdx], Score: players[tmIdx].Score - 1 }
      this.setState({games:g, players:players})
      return
     }

    if(game.Winner === 2 && !inservice) {
      //reset the game to no winner
      game.Winner = 0
      game.Opp1 = { ...game.Opp1, Score: game.Opp1.Score - 1 }
      game.Opp2 = { ...game.Opp2, Score: game.Opp2.Score - 1 }
      // also update in players array
      const opp1Idx = players.findIndex(p => p.Name === game.Opp1.Name)
      const opp2Idx = players.findIndex(p => p.Name === game.Opp2.Name)
      if(opp1Idx >= 0) players[opp1Idx] = { ...players[opp1Idx], Score: players[opp1Idx].Score - 1 }
      if(opp2Idx >= 0) players[opp2Idx] = { ...players[opp2Idx], Score: players[opp2Idx].Score - 1 }
      this.setState({games:g, players:players})
      return
     }


    if(game.Winner !== 0) {
      //changing the score
      adj=-1;
    }


    if(inservice) {
      game.Winner = 1
      game.Server = { ...game.Server, Score: game.Server.Score + 1 }
      game.TeamMate = { ...game.TeamMate, Score: game.TeamMate.Score + 1 }
      game.Opp1 = { ...game.Opp1, Score: game.Opp1.Score + adj }
      game.Opp2 = { ...game.Opp2, Score: game.Opp2.Score + adj }
      // also update in players array
      const serverIdx = players.findIndex(p => p.Name === game.Server.Name)
      const tmIdx = players.findIndex(p => p.Name === game.TeamMate.Name)
      const opp1Idx = players.findIndex(p => p.Name === game.Opp1.Name)
      const opp2Idx = players.findIndex(p => p.Name === game.Opp2.Name)
      if(serverIdx >= 0) players[serverIdx] = { ...players[serverIdx], Score: players[serverIdx].Score + 1 }
      if(tmIdx >= 0) players[tmIdx] = { ...players[tmIdx], Score: players[tmIdx].Score + 1 }
      if(opp1Idx >= 0) players[opp1Idx] = { ...players[opp1Idx], Score: players[opp1Idx].Score + adj }
      if(opp2Idx >= 0) players[opp2Idx] = { ...players[opp2Idx], Score: players[opp2Idx].Score + adj }
    }
    else {
      game.Winner = 2
      game.Server = { ...game.Server, Score: game.Server.Score + adj }
      game.TeamMate = { ...game.TeamMate, Score: game.TeamMate.Score + adj }
      game.Opp1 = { ...game.Opp1, Score: game.Opp1.Score + 1 }
      game.Opp2 = { ...game.Opp2, Score: game.Opp2.Score + 1 }
      // also update in players array
      const serverIdx = players.findIndex(p => p.Name === game.Server.Name)
      const tmIdx = players.findIndex(p => p.Name === game.TeamMate.Name)
      const opp1Idx = players.findIndex(p => p.Name === game.Opp1.Name)
      const opp2Idx = players.findIndex(p => p.Name === game.Opp2.Name)
      if(serverIdx >= 0) players[serverIdx] = { ...players[serverIdx], Score: players[serverIdx].Score + adj }
      if(tmIdx >= 0) players[tmIdx] = { ...players[tmIdx], Score: players[tmIdx].Score + adj }
      if(opp1Idx >= 0) players[opp1Idx] = { ...players[opp1Idx], Score: players[opp1Idx].Score + 1 }
      if(opp2Idx >= 0) players[opp2Idx] = { ...players[opp2Idx], Score: players[opp2Idx].Score + 1 }
    }
    this.autoAdvance(autoadvance, index)
    this.setState({games:g, players:players})
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
