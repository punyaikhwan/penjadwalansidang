import axios from 'axios'

export const fetchMahasiswa= () => {
    return function(dispatch) {

        dispatch({
            type: "FETCH MAHASISWA",
            payload: []
        })
        axios.get('http://localhost:3001/user').then(function (data) {
            console.log(data.data)
            var mhs = []
            data.data.forEach(function(item) {
                console.log(item.peran)
                if (item.peran == 1) {
                    mhs.push(item);
                }
            })
            console.log(mhs);
            dispatch({
                type: "DONE FETCH MAHASISWA",
                payload: mhs

            })
        })

    }
}