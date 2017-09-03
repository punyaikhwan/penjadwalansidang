import axios from 'axios'

export const fetchRuangan= () => {
    return function(dispatch) {

        dispatch({
            type: "FETCH RUANGAN",
            payload: []
        })
        let url = 'http://localhost:3001/node/ruangan'
        console.log("url ", url)
        axios.get(url).then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE FETCH RUANGAN",
                payload: data.data

            })
        })

    }
}