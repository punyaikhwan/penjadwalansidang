import {combineReducers} from 'redux';
import mhsTA from './mahasiswa-TA'
import mhsKP from './mahasiswa-KP'
import dosen from './dosen'
import kelompok from './kelompok-KP'
import dataTA from './data-TA'
import user from './user'

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
});

export default allReducers
