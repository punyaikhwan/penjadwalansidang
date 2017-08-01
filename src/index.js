import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import mngUser from './timta_mng_user';
import mngPasangan from './timta_mng_pasangan';
import mhsJadwal from './mhs_jadwal';
import mhsProfile from './mhs_profile';
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
      <Route exact path="/timta_mng_pasangan" component={mngPasangan}/>
      <Route exact path="/mhs_jadwal" component={mhsJadwal}/>
      <Route exact path="/mhs_profile" component={mhsProfile}/>
    </div>
  </Router>;

render(
    rooting,
    document.getElementById('root')
);
