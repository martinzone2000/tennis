import React from 'react'
import ShowScores from './ShowScores';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class CurrentGame extends React.Component {

    setWinner = (index, inservice) => {
        this.props.app.winner(index,inservice, false)
    }

    render() {
        console.log('current')
        console.log(this.props)
        var cur = this.props.app.state.CurrentGame
        var game = this.props.app.state.games[this.props.app.state.CurrentGame]
        var ngd = game.Winner == 0;
        var inWinner = game.Winner == 1 ? " gameWinner":""
        var outWinner = game.Winner == 2 ? " gameWinner":""
        if(game.InSide=="North")
        {
            return (
                <div>
                    <div className="court">
                        <div className="sideTitle">{game.InSide}</div>
                        <div className="side" onClick={() => this.props.app.winner(cur,true)}>  
                            <div className={"server player" + inWinner}>{game.Server.Name} ({game.Server.Score})</div>
                            <div className={"player"  + inWinner}>{game.TeamMate.Name} ({game.TeamMate.Score})</div>
                        </div>
                        <div className="net">Game {this.props.app.state.CurrentGame+1}</div>   
                        <div className="side" onClick={() => this.props.app.winner(cur,false)}>
                            <div className={"player"  + outWinner}>{game.Opp1.Name} ({game.Opp1.Score})</div>
                            <div className={"player"  + outWinner}>{game.Opp2.Name} ({game.Opp2.Score})</div>
                        </div>  
                        <div className="sideTitle">{game.OutSide}</div>                               
                    </div>
                    <div className="bench">
                            <div className="benchTitle">Sitting Out</div>
                            <div className="benchName">{game.Bench.Name}</div>
                        </div> 
                    <button className="button" disabled={ngd} onClick={() => this.props.app.nextGame()}>NextGame</button>
                    <div className="link">
                        <Link to="/games/">Game List</Link>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div className="court">
                        <div className="sideTitle">{game.OutSide}</div>
                        <div className="side" onClick={() => this.setWinner(cur,false)}>  
                        <div className={"player"  + outWinner}>{game.Opp1.Name} ({game.Opp1.Score})</div>
                            <div className={"player"  + outWinner}>{game.Opp2.Name} ({game.Opp2.Score})</div>
                        </div>
                        <div className="net">Game {this.props.app.state.CurrentGame+1}</div>   
                        <div className="side" onClick={() => this.setWinner(cur,true)}>
                            <div className={"player server"  + inWinner}>{game.Server.Name} ({game.Server.Score})</div>
                            <div className={"player"  + inWinner}>{game.TeamMate.Name} ({game.TeamMate.Score})</div>
                        </div>  
                        <div className="sideTitle">{game.InSide}</div>                               
                    </div>
                    <div className="bench">
                            <div className="benchTitle">Sitting Out</div>
                            <div className="benchName">{game.Bench.Name}</div>
                        </div> 
                    <button className="button" disabled={ngd} onClick={() => this.props.app.nextGame()}>NextGame</button>
                    <div className="link">
                        <Link to="/games/">Game List</Link>
                    </div>
                </div>
            )            
        }
    }
}

export default CurrentGame