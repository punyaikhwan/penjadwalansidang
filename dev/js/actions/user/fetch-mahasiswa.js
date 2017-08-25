import axios from 'axios'

export const fetchMahasiswa= () => {
    return function(dispatch) {

        dispatch({
            type: "FETCH MAHASISWA",
            payload: []
        })
        axios.get('http://localhost:3001/user').then(function (data) {
            var mhs = []
            data.data.forEach(function(item) {
                if (item.peran == 1) {
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