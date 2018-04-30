import React from 'react'
import GameListing from './GameListing';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ShowBrackets extends React.Component {

    render() {
        console.log("showbrackets")
        console.log(this.props)
        return (
            <div>
                <Link to="/current/">Current Game</Link>
                <table>
                    {this.props.app.state.games.map((game,index) => 
                        <GameListing
                             game={game} 
                             index={index}
                             key={index} 
                             setWinner={this.props.app.setWinner}
                    />)}
                </table>
            </div>
        )
    }
}

export default ShowBrackets