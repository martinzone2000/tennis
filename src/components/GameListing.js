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
        var spacer = this.props.index % 5 == 0 ? "spacer row":"row";
        var wc1 = this.props.game.Winner==1 ? "winner" : "";
        var wc2 = this.props.game.Winner==2 ? "winner" : "";
        var status = this.props.game.Winner==0 ? "notPlayed" : "";
        var rowclass= spacer+' '+status
        return (
            <tr className={rowclass}>
                <td>{this.props.index+1}</td>
                <td>{this.props.game.InSide}</td>
                <td className={wc1} onClick={() => this.props.setWinner(this.props.index,true,true)}>{server}</td>
                <td className={wc1} onClick={() => this.props.setWinner(this.props.index,true,true)}>{teammate}</td>
                <td className={wc2} onClick={() => this.props.setWinner(this.props.index,false,true)}>{opp1}</td>
                <td className={wc2} onClick={() => this.props.setWinner(this.props.index,false,true)}>{opp2}</td>
                <td>{bench}</td>
            </tr>
        )
    }
}

export default GameListing