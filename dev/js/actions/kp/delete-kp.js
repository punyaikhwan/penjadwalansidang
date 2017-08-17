import axios from 'axios'

export const deleteKP= (id) => {
    return function(dispatch) {

        dispatch({
            type: "DELETE KP"
        })
        axios.post('http://localhost:3001/kp/delete', {
            id: id
        }).then(function (data) {

            dispatch({
                type: "DONE delete KP"

            })
            axios.get('http://localhost:3001/kp').then(function (data) {
                console.log(data.data)

                dispatch({
                    type: "DONE FETCH KP",
                    payload: data.data

                })
            })
        })

    }
}