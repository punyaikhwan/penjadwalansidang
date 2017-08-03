import React from 'react';
import { render } from 'react-dom';
import '../../scss/index.scss';
import App from './App';
import mngUser from './timta_mng_user';
import mngPasanganKP from './timta_mng_pasangan_KP';
import mngPasanganTA from './timta_mng_pasangan_TA';
import mhsJadwal from './mhs_jadwal';
import mhsProfile from './mhs_profile';
import mngJadwal from './timta_mng_jadwal';
import mngCalendar from './timta_mng_calendar';
import notFound from './not_found';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

const rooting =
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/timta_mng_user" component={mngUser}/>
      <Route exact path="/timta_mng_pasangan_KP" component={mngPasanganKP}/>
      <Route exact path="/timta_mng_pasangan_TA" component={mngPasanganTA}/>
      <Route exact path="/timta_mng_jadwal" component={mngJadwal}/>
      <Route exact path="/mhs_jadwal" component={mhsJadwal}/>
      <Route exact path="/mhs_profile" component={mhsProfile}/>
      <Route exact path="/timta_calendar" component={mngCalendar}/>
      <Route path="*" component={notFound}/>
    </Switch>
  </Router>;

render(
    rooting,
    document.getElementById('root')
);
