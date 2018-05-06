import React from 'react'

class PlayerListing extends React.Component {

    removePlayer = () => {
        this.props.removePlayer(this.props.playerNum)
    }

    render() {
        return (
            <div className="playerRow">
                <div className="playerItem playerName">{this.props.playerName}</div>
                <div className="playerItem deletePlayer">
                    <button onClick={this.removePlayer} >Remove</button>
                </div>
            </div>
        )
    }
}

export default PlayerListing