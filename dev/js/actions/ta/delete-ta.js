import axios from 'axios'

export const deleteTA= (id) => {
    return function(dispatch) {

        dispatch({
            type: "DELETE TA"
        })
        axios.post('http://localhost:3001/node/ta/delete', {
            id: id
        }).then(function (data) {

            dispatch({
                type: "DONE DELETE TA"

            })
            axios.get('http://localhost:3001/node/ta').then(function (data) {
                console.log(data.data)

                dispatch({
                    type: "DONE FETCH TA",
                    payload: data.data

                })
            })
        })

    }
}