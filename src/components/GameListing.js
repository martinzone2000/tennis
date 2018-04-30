import React from 'react'
import '../App.css';

class GameListing extends React.Component {
    render() {
        console.log("gamelisting")
        console.log(this.props)
        var server = this.props.game.Server.Name;
        var teammate = this.props.game.TeamMate.Name;
        var opp1 = this.props.game.Opp1.Name;
        var opp2 = this.props.game.Opp2.Name;
        var bench = this.props.game.Bench.Name;
        var spacer = this.props.index % 5 == 0 ? "spacer":"";
        return (
            <tr className={spacer}>
                <td>{this.props.index+1}</td>
                <td onClick={() => this.props.winner(this.props.index,false)}>
                    <span className="server">{server}</span>
                    <span>{teammate}</span>
                </td>
                <td onClick={() => this.props.winner(this.props.index,true)}>
                    <span>{opp1}</span>
                    <span>{opp2}</span>
                </td>
                <td>{bench}</td>
            </tr>
        )
    }
}

export default GameListing