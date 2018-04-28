import React from 'react'

class GameListing extends React.Component {
    render() {
        console.log("gamelisting")
        console.log(this.props)
        var server = this.props.game.Server.Name;
        var teammate = this.props.game.TeamMate.Name;
        var opp1 = this.props.game.Opp1.Name;
        var opp2 = this.props.game.Opp2.Name;
        var bench = this.props.game.Bench.Name;
        return (
            <tr>
                <td onClick={() => this.props.setWinner(this.props.index,false)}>
                    <td>{server}</td>
                    <td>{teammate}</td>
                </td>
                <td onClick={() => this.props.setWinner(this.props.index,true)}>
                    <td>{opp1}</td>
                    <td>{opp2}</td>
                </td>
                <td>{bench}</td>
            </tr>
        )
    }
}

export default GameListing