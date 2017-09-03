import axios from 'axios'

export const fetchMahasiswa= () => {
    return function(dispatch) {

        dispatch({
            type: "FETCH MAHASISWA",
            payload: []
        })
        axios.get('http://localhost:3001/node/user').then(function (data) {
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