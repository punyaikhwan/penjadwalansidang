import axios from 'axios'

export const fetchDosen= () => {
    return function(dispatch) {

        dispatch({
            type: "FETCH DOSEN",
            payload: []
        })
        axios.get('http://localhost:3001/user').then(function (data) {
            console.log(data.data)
            var dosen = []
            data.data.forEach(function(item) {
                console.log(item.peran)
                if (item.peran == 2) {
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