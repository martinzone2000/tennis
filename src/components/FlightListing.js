import React from 'react'
import GameListing from './GameListing'

class FlightListing extends React.Component {

    showGame = (game,flight,index) => {
        return <GameListing game={game} flight={flight} index={index} />
    }

    render() {
        console.log("FlightListing")
        console.log(this.props)
        return (
            <tbody>
                {this.showGame(this.props.games[0],0,0)}
                <tr></tr>
                {this.showGame(this.props.games[1],0,1)}
            </tbody>
        )
    }
}

export default FlightListing