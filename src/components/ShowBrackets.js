import React from 'react'
import GameListing from './GameListing';
import { Link } from "react-router-dom";
import ShowScores from './ShowScores'

class ShowBrackets extends React.Component {

    render() {
        console.log("showbrackets")
        console.log(this.props)
        return (
            <div className="spaceBelow">
                <ShowScores players={this.props.app.state.players}/>
                <Link to="/current/">Current Game</Link>
                <table className="flightTable">
                    <thead>
                        <tr>
                            <td>Game</td>
                            <td>Facing</td>
                            <td>Server</td>
                            <td>In</td>
                            <td>Opp 1</td>
                            <td>Opp 2</td>
                            <td>Bench</td>
                        </tr>
                    </thead>
                    {this.props.app.state.games.map((game,index) => 
                        <GameListing
                             game={game} 
                             index={index}
                             key={index} 
                             setWinner={this.props.app.winner}
                    />)}
                </table>
            </div>
        )
    }
}

export default ShowBrackets