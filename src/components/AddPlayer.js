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
                <input name="name" className="addPlayerInput" ref={this.nameref} 
                placeholder='Name' type="text"
                disabled={this.props.canAddMore} />
                <button type="submit" disabled={this.props.canAddMore}>Add</button>
            </form>
        )
    }
}

export default AddPlayer