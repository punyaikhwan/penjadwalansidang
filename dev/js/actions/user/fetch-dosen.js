import axios from 'axios'

export const fetchDosen= () => {
    return function(dispatch) {

        dispatch({
            type: "FETCH DOSEN",
            payload: []
        })
        axios.get('http://localhost:3001/node/user').then(function (data) {
            var dosen = []
            data.data.forEach(function(item) {
                if (item.peran == 1) {
                    dosen.push(item);
                }
            })
            dispatch({
                type: "DONE FETCH DOSEN",
                payload: dosen

            })
        })

    }
}