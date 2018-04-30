import React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import App from '../App'
import CurrentGame from './CurrentGame';
import ShowBrackets from './ShowBrackets';
import AddPlayer from './AddPlayer';


class Router extends React.Component {

    render() {
        console.log('router')
        console.log(this.props)
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={(props) => <AddPlayer {...props} {...this.props}/>} />
                    <Route path="/games/" component={(props) => <ShowBrackets {...props} {...this.props}/>} />
                    <Route path="/current/" component={(props) => <CurrentGame {...props} {...this.props}/>}  />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router 