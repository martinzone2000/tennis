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
                <td>{server}</td>
                <td>{teammate}</td>
                <td>{opp1}</td>
                <td>{opp2}</td>
                <td>{bench}</td>
            </tr>
        )
    }
}

export default GameListing