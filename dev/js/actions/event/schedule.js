import axios from 'axios'

export const schedule= () => {
    return function(dispatch) {

        dispatch({
            type: "SCHEDULING",
            payload: []
        })
        // axios.post('http://localhost:3001/calendars', {
        //
        // }).then(function (data) {
        //     console.log(data.data)
        //
        //     dispatch({
        //         type: "DONE SCHEDULING",
        //         payload: data.data
        //
        //     })
        // })

    }
}