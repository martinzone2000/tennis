import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Nav extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <Link to="/current/">Current Game</Link>
                <Link to="/games/">Game List</Link>
            </div>
        )
    }
}

export default Nav