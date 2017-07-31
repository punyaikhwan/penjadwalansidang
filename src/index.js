import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import mngUser from './timta_mng_user';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const rooting = 
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route exact path="/timta_mng_user" component={mngUser}/>
    </div>
  </Router>;

render(
    rooting,
    document.getElementById('root')
);
