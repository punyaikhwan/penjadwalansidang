import axios from 'axios'

export const newKP= () => {
    return function(dispatch) {

        dispatch({
            type: "NEW KP"
        })
        axios.post('http://localhost:3001/node/kp/new').then(function (data) {

            dispatch({
                type: "DONE NEW KP"

            })
            axios.get('http://localhost:3001/node/kp').then(function (data) {
                console.log(data.data)

                dispatch({
                    type: "DONE FETCH KP",
                    payload: data.data

                })
            })
        })

    }
}