import axios from 'axios'
import {nodeURL} from '../config.js'

export const fetchMahasiswa= () => {
    return function(dispatch) {

        dispatch({
            type: "FETCH MAHASISWA",
            payload: []
        })
        axios.get(nodeURL+'/user').then(function (data) {
            var mhs = []
            data.data.forEach(function(item) {
                if (item.peran == 0) {
                    mhs.push(item);
                }
            })
            dispatch({
                type: "DONE FETCH MAHASISWA",
                payload: mhs

            })
        })

    }
}