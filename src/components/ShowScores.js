import React from 'react'

class ShowScores extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div>
                {this.props.players.map((player) => {
                    return <p>{player.Name}  {player.Score}</p>
                })}
            </div>
        )
    }
}

export default ShowScores