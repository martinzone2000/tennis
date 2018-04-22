import React from 'react'
import PlayerListing from './PlayerListing'

class ListPlayers extends React.Component {

    render() {
        return(
            <div>
                <ul>
                    {this.props.players.map((player,index) => 
                        <PlayerListing
                             playerName={player.Name} 
                             removePlayer={this.props.removePlayer}
                             playerNum={index}
                             key={index} 
                    />)}
                </ul>
            </div>
        )
    }
}

export default ListPlayers