import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AddPlayer from './components/AddPlayer'
import ListPlayers from './components/ListPlayers'
import ShowBrackets from './components/ShowBrackets'

class App extends React.Component {

  state = {
    players: [],
    numPlayers: 0,
    bracket: [],
    flights:[]
  }

  addPlayer = player => {
    this.setState({players: [...this.state.players, player]});
  }

  removePlayer = index => {
    console.log(this.state.players)
    this.setState((prevState) => ({
       players : prevState.players.filter((_,i) => i !== index)
      }));
  }

  getRound = (matrix, shiftAry) => {
    //var matrix = [...this.state.bracket]
    var i;
    var games = []
    for(i=0 ; i < matrix.length;i++) {
        var game = {
          Server: matrix[0][i],
          Bench: matrix[1][i],
          TeamMate: matrix[shiftAry[0]][i],
          Opp1: matrix[shiftAry[1]][i],
          Opp2: matrix[shiftAry[2]][i]
        }
        games.push(game);
    }
    console.log(games)
    return games
  }

  startGame = () => {
    var players = [...this.state.players]
    var i;
    var b = []
    for(i=0 ; i<this.state.players.length;i++) {
      b.push(players)
      players = [...players]
      players.push(players.shift())
    }
    this.setState({bracket: b});

    var flights = []
    flights.push(this.getRound(b,[2,3,4]));
    flights.push(this.getRound(b,[2,4,3]));
    flights.push(this.getRound(b,[3,2,4]));
    flights.push(this.getRound(b,[3,4,2]));
    flights.push(this.getRound(b,[4,2,3]));
    flights.push(this.getRound(b,[4,3,2]));

    this.setState({flights:flights})
    console.log(flights);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>Build 1</div>
        <AddPlayer addPlayer={this.addPlayer}
          canAddMore={this.state.players.length>=5}
        />
        <ListPlayers players={this.state.players} removePlayer={this.removePlayer}/>
        {this.state.players.length>=5 ? <button onClick={this.startGame}>Shall we play a game?</button> : null }
        <ShowBrackets flights={this.state.flights} />
      </div>  
    );
  }
}

export default App;
