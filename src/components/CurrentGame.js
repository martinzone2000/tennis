import React from 'react'
import ShowScores from './ShowScores';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class CurrentGame extends React.Component {
    render() {
        console.log('current')
        console.log(this.props)
        var cur = this.props.app.state.CurrentGame
        var game = this.props.app.state.games[this.props.app.state.CurrentGame]
        return (
            <div>
                <ShowScores players={this.props.app.state.players}/>
                <div className="court">
                    <div className="side" onClick={() => this.props.app.winner(cur,true)}>
                        <div className="sideTitle">{game.InSide}</div>
                        
                        <div className="server player">{game.Server.Name}</div>
                        <div className="player">{game.TeamMate.Name}</div>
                    </div>   
                    <div className="side" onClick={() => this.props.app.winner(cur,false)}>
                        <div className="player">{game.Opp1.Name}</div>
                        <div className="player">{game.Opp2.Name}</div>
                        <div className="sideTitle">{game.OutSide}</div>
                    </div>  
                    <div className="bench">
                        <div>Sitting Out</div>
                        <div>{game.Bench.Name}</div>
                    </div>                                
                </div>
                <button onClick={() => this.props.app.nextGame()}>NextGame</button>
                <div>
                    <Link to="/games/">Game List</Link>
                </div>
            </div>
        )
    }
}

export default CurrentGame