import axios from 'axios'

export const deleteUser= (id) => {
    return function(dispatch) {

        dispatch({
            type: "DELETE USER"
        })
        axios.post('http://localhost:3001/user/delete', {
            "id":id
        }).then(function (data) {

            dispatch({
                type: "DONE DELETE USER"

            })
            axios.get('http://localhost:3001/user').then(function (data) {
                console.log(data.data)

                dispatch({
                    type: "DONE FETCH USER",
                    payload: data.data

                })
            })
        })

    }
}