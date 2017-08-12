import React from 'react';
import UserList from '../containers/user-list';
import UserDetails from '../containers/user-detail';
import Stuff from '../containers/App.js'
import mngUser from '../containers/timta_mng_user';
import mngPasanganKP from '../containers/timta_mng_pasangan_KP';
import mngPasanganTA from '../containers/timta_mng_pasangan_TA';
import mhsProfile from '../containers/mhs_profile';
import mngJadwalSeminarKP from '../containers/timta_mng_jadwal_seminarKP';
import mngJadwalSeminarTA1 from '../containers/timta_mng_jadwal_seminarTA1';
import mngJadwalSeminarTA2 from '../containers/timta_mng_jadwal_seminarTA2';
import mngJadwalSidangAkhir from '../containers/timta_mng_jadwal_sidangTA';
import mngRuangan from '../containers/timta_mng_ruangan';
import mhsJadwalSeminarKP from '../containers/mhs_jadwal_seminarKP';
import mhsJadwalSeminarTA1 from '../containers/mhs_jadwal_seminarTA1';
import mhsJadwalSeminarTA2 from '../containers/mhs_jadwal_seminarTA2';
import mhsJadwalSidangAkhir from '../containers/mhs_jadwal_sidangTA';
import mngCalendar from '../containers/timta_mng_calendar';
import notFound from '../containers/not_found';
require('../../scss/style.scss');
require('../../scss/index.scss');

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const App = () => (

	<Router>
	    <Switch>
	      <Route exact path="/" component={Stuff}/>
	      <Route exact path="/timta_mng_user" component={mngUser}/>
	      <Route exact path="/timta_mng_pasangan_KP" component={mngPasanganKP}/>
	      <Route exact path="/timta_mng_pasangan_TA" component={mngPasanganTA}/>
	      <Route exact path="/timta_mng_jadwal_seminarKP" component={mngJadwalSeminarKP}/>
        <Route exact path="/timta_mng_jadwal_seminarTA1" component={mngJadwalSeminarTA1}/>
        <Route exact path="/timta_mng_jadwal_seminarTA2" component={mngJadwalSeminarTA2}/>
        <Route exact path="/timta_mng_jadwal_sidangTA" component={mngJadwalSidangAkhir}/>
        <Route exact path="/timta_mng_ruangan" component={mngRuangan}/>
        <Route exact path="/mhs_jadwal_seminarKP" component={mhsJadwalSeminarKP}/>
        <Route exact path="/mhs_jadwal_seminarTA1" component={mhsJadwalSeminarTA1}/>
        <Route exact path="/mhs_jadwal_seminarTA2" component={mhsJadwalSeminarTA2}/>
        <Route exact path="/mhs_jadwal_sidangTA" component={mngJadwalSidangAkhir}/>
	      <Route exact path="/mhs_profile" component={mhsProfile}/>
	      <Route exact path="/timta_calendar" component={mngCalendar}/>
	      <Route path="*" component={notFound}/>
	    </Switch>
  	</Router>
);

export default App;
