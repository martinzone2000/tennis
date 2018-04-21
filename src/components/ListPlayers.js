import React from 'react'
import PlayerListing from './PlayerListing'

class ListPlayers extends React.Component {

    render() {
        console.log(this.props.players)
        console.log(this.props.removePlayer)
        return(
            <div>
                <ul>
                    {Object.keys(this.props.players).map(key => 
                        <PlayerListing
                             playerName={this.props.players[key].Name} 
                             removePlayer={this.props.removePlayer}
                             playerNum={key}
                             key={key} 
                    />)}
                </ul>
            </div>
        )
    }
}

export default ListPlayers