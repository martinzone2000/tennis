import React from "react"
import ListPlayers from "./ListPlayers"
import {flightGeneration} from "../App"

class AddPlayer extends React.Component {

    nameref = React.createRef();
    dialogRef = React.createRef();

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

    isFull = (players) => {
        return players.length >= 5
    }

    showDialog = () => {
        if (this.dialogRef.current) {
            this.dialogRef.current.showModal(); // Show the dialog
        }
    };

    closeDialog = () => {
        if (this.dialogRef.current) {
            this.dialogRef.current.close(); // Close the dialog
            this.startGame(); // Call startGame after the dialog closes
        }
    };

    render() {
        console.log("add player")
        console.log(this.props)
        var full = this.isFull(this.props.app.state.players)
        return(
            <div>
                <dialog ref={this.dialogRef}>
                    <h2>Select a game scheduling method</h2>
                    <button className="themeButton" onClick={() => {this.props.app.setFlightType( flightGeneration.SHUFFLED); this.closeDialog()}}>Lancenheimer</button>
                    <button className="themeButton" onClick={() => {this.props.app.setFlightType( flightGeneration.FIXED); this.closeDialog()}}>RasMartin</button>
                </dialog>
                <form onSubmit={this.addPlayer} >
                    <input name="name" className="addPlayerInput" ref={this.nameref} 
                    placeholder='Name' type="text"
                    disabled={full}/>
                    <button type="submit" disabled={full}>Add</button>
                </form>
                <ListPlayers players={this.props.app.state.players} removePlayer={this.props.app.removePlayer}/>
                {this.props.app.state.players.length>=5 ? <button onClick={this.showDialog}>Shall we play a game?</button> : null }
            </div>
        )
    }
}

export default AddPlayer