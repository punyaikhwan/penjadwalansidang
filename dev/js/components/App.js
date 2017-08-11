import React from 'react';
import UserList from '../containers/user-list';
import UserDetails from '../containers/user-detail';
import Stuff from '../containers/App.js'
import mngUser from '../containers/timta_mng_user';
import mngPasanganKP from '../containers/timta_mng_pasangan_KP';
import mngPasanganTA from '../containers/timta_mng_pasangan_TA';
import mhsJadwal from '../containers/mhs_jadwal';
import mhsProfile from '../containers/mhs_profile';
import mngJadwal from '../containers/timta_mng_jadwal';
import mngCalendar from '../containers/timta_mng_calendar';
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
	      <Route exact path="/timta_mng_jadwal" component={mngJadwal}/>
	      <Route exact path="/mhs_jadwal" component={mhsJadwal}/>
	      <Route exact path="/mhs_profile" component={mhsProfile}/>
	      <Route exact path="/timta_calendar" component={mngCalendar}/>
	      <Route path="*" component={notFound}/>
	    </Switch>
  	</Router>
);

export default App;
