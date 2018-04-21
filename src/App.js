import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AddPlayer from './components/AddPlayer'
import ListPlayers from './components/ListPlayers'

class App extends React.Component {

  state = {
    players: {},
    numPlayers: 0
  }

  addPlayer = player => {
    const tmpplayers = {...this.state.players};
    const cur = this.state.numPlayers;
    tmpplayers[cur]=player;
    this.setState({players:tmpplayers, numPlayers:cur+1})
  }

  removePlayer = playerNum => {
    console.log(playerNum)
    const tmpplayers = {...this.state.players};
    delete tmpplayers[playerNum]
    this.setState({players:tmpplayers})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <AddPlayer addPlayer={this.addPlayer}/>
        <ListPlayers players={this.state.players} removePlayer={this.removePlayer}/>
      </div>
    );
  }
}

export default App;
