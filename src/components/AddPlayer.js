import React from "react"
import ListPlayers from "./ListPlayers"

class AddPlayer extends React.Component {

    nameref = React.createRef();

    addPlayer = (event) => {
        event.preventDefault();
        this.props.app.addPlayer(
            { Name: this.nameref.current.value, Score: 0}
        );
        event.currentTarget.reset();
    }

    componentDidMount(){
        this.nameref.current.focus();
      }

    startGame = () => {
        this.props.app.startGame();
        this.props.history.push('/current/');
    }


    render() {
        console.log("add player")
        console.log(this.props)
        return(
            <div>
                <form onSubmit={this.addPlayer} >
                    <input name="name" className="addPlayerInput" ref={this.nameref} 
                    placeholder='Name' type="text"
                    disabled={false} />
                    <button type="submit" disabled={this.props.app.canAddMore}>Add</button>
                </form>
                <ListPlayers players={this.props.app.state.players} removePlayer={this.props.app.removePlayer}/>
                {this.props.app.state.players.length>=5 ? <button onClick={this.startGame}>Shall we play a game?</button> : null }
            </div>
        )
    }
}

export default AddPlayer