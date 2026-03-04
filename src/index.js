import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { withRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom"

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
const AppWithRouter = withRouter(App);

ReactDOM.render((
    <BrowserRouter  basename={process.env.PUBLIC_URL || ''}>
      <AppWithRouter />
    </BrowserRouter>
  ), document.getElementById('root'))
