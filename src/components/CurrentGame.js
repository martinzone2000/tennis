import React from 'react'

class CurrentGame extends React.Component {
    render() {
        console.log(this.props)
        if(this.props.current<0) {
            return <div></div>
        }

        return (
            <div>
                <div onClick={() => this.props.setWinner(this.props.current,true)}>
                    <p>{this.props.game.InSide}</p>
                    <p>   {this.props.game.Server.Name}</p>
                    <p>   {this.props.game.TeamMate.Name}</p>
                </div>
                <div onClick={() => this.props.setWinner(this.props.current,false)}>
                    <p>{this.props.game.OutSide}</p>
                    <p>   {this.props.game.Opp1.Name}</p>
                    <p>   {this.props.game.Opp2.Name}</p>
                </div>
                <div>
                    <p>Sitting Out</p>
                    <p>  {this.props.game.Bench.Name}</p>
                </div>
                <button onClick={() => this.props.nextGame()}>NextGame</button>
            </div>
        )
    }
}

export default CurrentGame