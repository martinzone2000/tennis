import React from 'react'
import GameListing from './GameListing'

class FlightListing extends React.Component {
    render() {
        console.log("FlightListing")
        console.log(this.props)
        return (
            <tbody>
                {this.props.games.map((game,index) => 
                        <GameListing
                             game={game} 
                             gameNum={index}
                             key={index} 
                    />)}
            </tbody>
        )
    }
}

export default FlightListing