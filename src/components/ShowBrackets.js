import React from 'react'
import GameListing from './GameListing';

class ShowBrackets extends React.Component {

    render() {
        console.log("showbrackets")
        console.log(this.props)
        return (
            <div>
                <table>
                    <tr>
                        <th>Server</th>
                        <th>Server Team Mate</th>
                        <th>OOS 1</th>
                        <th>OOS 2</th>
                        <th>Bench</th>
                    </tr>
                    {this.props.games.map((game,index) => 
                        <GameListing
                             game={game} 
                             index={index}
                             key={index} 
                             setWinner={this.props.setWinner}
                    />)}
                </table>
            </div>
        )
    }
}

export default ShowBrackets