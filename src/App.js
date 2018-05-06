import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AddPlayer from './components/AddPlayer'
import ListPlayers from './components/ListPlayers'
import ShowBrackets from './components/ShowBrackets'
import ShowScores from './components/ShowScores'
import CurrentGame from './components/CurrentGame'
import Router from "./components/Router"

class App extends React.Component {

  state = {
    players: [],
    numPlayers: 0,
    bracket: [],
    games:[],
    CurrentGame:-1
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

  getRound = (matrix, shiftAry, inside, outside) => {
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

    flights = flights.concat(this.getRound(b,[2,3,4],'North', 'South'))
    flights = flights.concat(this.getRound(b,[2,4,3], 'South', 'North'))
    flights = flights.concat(this.getRound(b,[3,2,4],'North', 'South'))
    flights = flights.concat(this.getRound(b,[3,4,2], 'South', 'North'))
    flights = flights.concat(this.getRound(b,[4,2,3],'North', 'South'))
    flights = flights.concat(this.getRound(b,[4,3,2], 'South', 'North'))

    this.setState({games:flights, CurrentGame:0})


    console.log(flights);
  }

  winner = (index, inservice, autoadvance) => {
    console.log("winner is "+ index+ "  " + inservice)
    var g = [...this.state.games]
    var game = g[index]
    console.log(this.state.CurrentGame)
    console.log(game)

    if(index > this.state.CurrentGame) return;

    var adj=0

    if(game.Winner === 1 && inservice) {
      //reset the game to no winner
      game.Winner = 0
      game.Server.Score=game.Server.Score-1
      game.TeamMate.Score=game.TeamMate.Score-1
      //this.autoAdvance(autoadvance, index)
      this.setState({games:g})
      return
     }

    if(game.Winner === 2 && !inservice) {
      //reset the game to no winner
      game.Winner = 0
      game.Opp1.Score=game.Opp1.Score-1
      game.Opp2.Score=game.Opp2.Score-1
      //this.autoAdvance(autoadvance, index)
      this.setState({games:g})
      return
     }


    if(game.Winner !== 0) {
      //changing the score
      adj=-1;
    }


    if(inservice) {
      game.Winner = 1
      game.Server.Score=game.Server.Score+1
      game.TeamMate.Score=game.TeamMate.Score+1
      game.Opp1.Score=game.Opp1.Score+adj
      game.Opp2.Score=game.Opp2.Score+adj   
    }
    else {
      game.Winner = 2
      game.Server.Score=game.Server.Score+adj
      game.TeamMate.Score=game.TeamMate.Score+adj
      game.Opp1.Score=game.Opp1.Score+1
      game.Opp2.Score=game.Opp2.Score+1    
    }
    this.autoAdvance(autoadvance, index)
    this.setState({games:g})
  }

  nextGame = () => {
    var cur = this.state.CurrentGame+1;
    this.setState({CurrentGame:cur})
  }

  autoAdvance = (auto, index) => {
    var cur = this.state.CurrentGame
    if(index==cur && auto) {
      this.setState({CurrentGame:cur+1})
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to RasNewton</h1>
        </header>
        <Router app={this} />
      </div>  
    );
  }
}

export default App;
