import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CurrentGame from './CurrentGame';
import ShowBrackets from './ShowBrackets';
import AddPlayer from './AddPlayer';

class Router extends React.Component {
  render() {
    // Router simply renders the appropriate component based on path.
    // state restoration and navigation are handled in App.

    return (
        <Switch>
          <Route exact path="/index.html">
            <Redirect to="/" />
          </Route>
          <Route exact path="/" render={(props) => <AddPlayer {...this.props} {...props} />} />
          <Route path="/games" render={(props) => <ShowBrackets {...this.props} {...props} />} />
          <Route path="/current" render={(props) => <CurrentGame {...this.props} {...props} />} />
          
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