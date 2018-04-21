import React from 'react'

class PlayerListing extends React.Component {

    removePlayer = () => {
        this.props.removePlayer(this.props.playerNum)
    }

    render() {
        return (
            <div>
                <span>{this.props.playerName}</span>
                <button onClick={this.removePlayer} >Remove</button>
            </div>
        )
    }
}

export default PlayerListing