import React from 'react';
import { Link } from 'react-router-dom';

class CurrentGame extends React.Component {
  setWinner = (index, inservice) => {
    this.props.app.winner(index, inservice, false);
  };

  render() {
    console.log('current');
    console.log(this.props);

    const cur = (this.props.app.state && this.props.app.state.CurrentGame) !== undefined
    ? this.props.app.state.CurrentGame
    : -1;
  
  const game = this.props.app.state && this.props.app.state.games
    ? this.props.app.state.games[cur]
    : undefined;

    // Handle cases where game or cur is undefined
    if (!game || cur === -1) {
      return (
        <div>
          <h2>No game data available.</h2>
          <div className="link">
            <Link to="/">Go Back to Home</Link>
          </div>
        </div>
      );
    }

    const ngd = game.Winner === 0 || cur >= this.props.app.state.games.length;
    const inWinner = game.Winner === 1 ? ' gameWinner' : '';
    const outWinner = game.Winner === 2 ? ' gameWinner' : '';

    if (game.InSide === 'North') {
      return (
        <div className="current-game-container">
          <div className="court">
            <div className="sideTitleTop">{game.InSide}</div>
            <div className="side" onClick={() => this.props.app.winner(cur, true)}>
              <div className={`server player${inWinner}`}>
                {game.Server.Name} ({game.Server.Score})
              </div>
              <div className={`player${inWinner}`}>
                {game.TeamMate.Name} ({game.TeamMate.Score})
              </div>
            </div>
            <div className="net">Game {cur + 1}</div>
            <div className="side" onClick={() => this.props.app.winner(cur, false)}>
              <div className={`player${outWinner}`}>
                {game.Opp1.Name} ({game.Opp1.Score})
              </div>
              <div className={`player${outWinner}`}>
                {game.Opp2.Name} ({game.Opp2.Score})
              </div>
            </div>
            <div className="sideTitleBottom">{game.OutSide}</div>
          </div>
          <div className="bench">
            <div className="benchTitle">Sitting Out</div>
            <div className="benchName">{game.Bench.Name}</div>
          </div>
          <button className="button" disabled={ngd} onClick={() => this.props.app.nextGame()}>
            Next Game
          </button>
          <div className="link">
            <Link to="/games/">Current Standings</Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="current-game-container">
          <div className="court">
            <div className="sideTitleTop">{game.OutSide}</div>
            <div className="side" onClick={() => this.setWinner(cur, false)}>
              <div className={`player${outWinner}`}>
                {game.Opp1.Name} ({game.Opp1.Score})
              </div>
              <div className={`player${outWinner}`}>
                {game.Opp2.Name} ({game.Opp2.Score})
              </div>
            </div>
            <div className="net">Game {cur + 1}</div>
            <div className="side" onClick={() => this.setWinner(cur, true)}>
              <div className={`player server${inWinner}`}>
                {game.Server.Name} ({game.Server.Score})
              </div>
              <div className={`player${inWinner}`}>
                {game.TeamMate.Name} ({game.TeamMate.Score})
              </div>
            </div>
            <div className="sideTitleBottom">{game.InSide}</div>
          </div>
          <div className="bench">
            <div className="benchTitle">Sitting Out</div>
            <div className="benchName">{game.Bench.Name}</div>
          </div>
          <button className="button" disabled={ngd} onClick={() => this.props.app.nextGame()}>
            Next Game
          </button>
          <div className="link">
            <Link to="/games/">Current Standings</Link>
          </div>
        </div>
      );
    }
  }
}

export default CurrentGame;