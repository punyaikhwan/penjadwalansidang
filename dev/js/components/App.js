import React from 'react';
import Stuff from '../containers/App.js'
import mngUser from '../containers/timta_mng_user';
import mngPasanganKP from '../containers/timta_mng_pasangan_KP';
import mngPasanganTA from '../containers/timta_mng_pasangan_TA';
import mhsProfile from '../containers/mhs_profile';
import mhsJadwal from '../containers/mhs_jadwal';
import mngJadwalSeminarKP from '../containers/timta_mng_jadwal_seminarKP';
import mngJadwalSeminarTA1 from '../containers/timta_mng_jadwal_seminarTA1';
import mngJadwalSeminarTA2 from '../containers/timta_mng_jadwal_seminarTA2';
import mngJadwalSidangAkhir from '../containers/timta_mng_jadwal_sidangTA';
import mngRuangan from '../containers/timta_mng_ruangan';
import mngCalendar from '../containers/timta_mng_calendar';
import mngAllCalendar from '../containers/timta_mng_allCalendars';
import dsnSetting from '../containers/dosen_setting';
import dsnCalendar from '../containers/dosen_calendar';
import notFound from '../containers/not_found';
import '../../scss/style.scss';
import '../../scss/index.scss';
import injectTapEvent from "react-tap-event-plugin"

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
var injectTapEventPlugin = injectTapEvent
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
        <Route exact path="/mhs_jadwal" component={mhsJadwal}/>
	      <Route exact path="/mhs_profile" component={mhsProfile}/>
	      <Route exact path="/timta_calendar" component={mngCalendar}/>
        <Route exact path="/timta_allcalendars" component={mngAllCalendar}/>
        <Route exact path="/dosen_setting" component={dsnSetting}/>
        <Route exact path="/dosen_calendar" component={dsnCalendar}/>
	      <Route path="*" component={notFound}/>
	    </Switch>
  	</Router>
);

export default App;
