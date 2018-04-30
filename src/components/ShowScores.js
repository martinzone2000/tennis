import React from 'react'

class ShowScores extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div className="scorebox">
                {this.props.players.map((player) => {
                    return (<div className="score"><div>{player.Name}</div><div>{player.Score}</div></div>)
                })}
            </div>
        )
    }
}

export default ShowScores