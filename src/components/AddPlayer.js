import React from "react"

class AddPlayer extends React.Component {

    nameref = React.createRef();

    addPlayer = (event) => {
        event.preventDefault();
        this.props.addPlayer(
            { Name: this.nameref.current.value, Score: 0}
        );
        event.currentTarget.reset();
    }


    render() {
        return(
            <form onSubmit={this.addPlayer} >
                <input name="name" className="addPlayerInput" ref={this.nameref} placeholder='Name' type="text" />
                <button type="submit">Add</button>
            </form>
        )
    }
}

export default AddPlayer