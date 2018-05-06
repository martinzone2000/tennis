import React from 'react'
import PlayerListing from './PlayerListing'

class ListPlayers extends React.Component {

    render() {
        return(
            <div className="player-grid">
                {this.props.players.map((player,index) => 
                    <PlayerListing
                            playerName={player.Name} 
                            removePlayer={this.props.removePlayer}
                            playerNum={index}
                            key={index} 
                />)}
            </div>
        )
    }
}

export default ListPlayers