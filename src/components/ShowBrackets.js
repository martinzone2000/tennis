import React from 'react'
import GameListing from './GameListing';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ShowScores from './ShowScores'

class ShowBrackets extends React.Component {

    render() {
        console.log("showbrackets")
        console.log(this.props)
        return (
            <div className="spaceBelow">
                <ShowScores players={this.props.app.state.players}/>
                <Link to="/current/">Current Game</Link>
                <table>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Inside</td>
                            <td>Sever</td>
                            <td>In</td>
                            <td>Out 1</td>
                            <td>Our 2</td>
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