import axios from 'axios'

export const deleteRuangan= (id) => {
    return function(dispatch) {

        dispatch({
            type: "DELETE RUANGAN"
        })
        axios.post('http://localhost:3001/node/ruangan/delete', {
            id: id
        }).then(function (data) {

            dispatch({
                type: "DONE DELETE RUANGAN"

            })
            axios.get('http://localhost:3001/node/ruangan').then(function (data) {
                console.log(data.data)

                dispatch({
                    type: "DONE FETCH RUANGAN",
                    payload: data.data

                })
            })
        })

    }
}