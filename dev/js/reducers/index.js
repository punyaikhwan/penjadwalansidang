import {combineReducers} from 'redux';
import mhsTA from './mahasiswa-TA'
import mhsKP from './mahasiswa-KP'
import dosen from './dosen'
import kelompok from './kelompok-KP'
import dataTA from './data-TA'
import user from './user'
import events from './events'
import active from './active-user'
import calendar from './calendars'
import eventCalon from './event-calon'
import loading from './loading'
import ruangan from './ruangan'
import tipe from './tipe_event'
import eventMhs from './event-mhs'
import checkToken from './check-token'
import profile from './profile-user'

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    mahasiswaTA: mhsTA,
    mahasiswaKP: mhsKP,
    dosen: dosen,
    kelompokKP: kelompok,
    dataTA: dataTA,
    user: user,
    events: events,
    activeUser: active,
    calendar: calendar,
    calonEvent: eventCalon,
    loading: loading,
    ruangan: ruangan,
    tipeEvent: tipe,
    eventMhs: eventMhs,
    checkToken:checkToken, 
    profile: profile
});

export default allReducers