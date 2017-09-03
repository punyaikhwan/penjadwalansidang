import axios from 'axios'

export const fetchRuangan= () => {
    return function(dispatch) {

        dispatch({
            type: "FETCH RUANGAN",
            payload: []
        })
        axios.get('http://localhost:3001/node/ruangan').then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE FETCH RUANGAN",
                payload: data.data

            })
        })

    }
}