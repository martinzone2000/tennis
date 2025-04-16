import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CurrentGame from './CurrentGame';
import ShowBrackets from './ShowBrackets';
import AddPlayer from './AddPlayer';

class Router extends React.Component {
  render() {
    console.log('router');
    console.log(this.props);
    return (
      <Switch>
        <Route exact path="/index.html">
          <Redirect to="/" />
        </Route>
        <Route exact path="/" render={(props) => <AddPlayer {...this.props} {...props} />} />
        <Route path="/games" render={(props) => <ShowBrackets {...this.props} {...props} />} />
        <Route path="/current" render={(props) => <CurrentGame {...this.props} {...props} />} />
        <Route exact path="/tennis" render={(props) => <AddPlayer {...this.props} {...props} />} />
        <Route path="/tennis/games" render={(props) => <ShowBrackets {...this.props} {...props} />} />
        <Route path="/tennis/current" render={(props) => <CurrentGame {...this.props} {...props} />} />
        
        {/* Default route to catch all unmatched paths */}
        <Route
          render={(props) => {
            console.log('Unmatched route:', props.location.pathname);
            return <div>404: {props.location.pathname} Not Found</div>;
          }}
        />
      </Switch>
    );
  }
}

export default Router;