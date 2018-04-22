import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AddPlayer from './components/AddPlayer'
import ListPlayers from './components/ListPlayers'

class App extends React.Component {

  state = {
    players: [],
    numPlayers: 0
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

  render() {
    console.log(this.state.players.length>=5)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <AddPlayer addPlayer={this.addPlayer}
          canAddMore={this.state.players.length>=5}
        />
        <ListPlayers players={this.state.players} removePlayer={this.removePlayer}/>
        {this.state.players.length>=5 ? <button>Shall we play a game?</button> : null }
      </div>  
    );
  }
}

export default App;
