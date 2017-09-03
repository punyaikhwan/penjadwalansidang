export const newEvent= (event) => {
    return function(dispatch) {

        dispatch({
            type: "NEW EVENT"
        })
        axios.post('http://localhost:3001/node/events/new', {
            event: event
        }).then(function (data) {

            dispatch({
                type: "DONE NEW EVENT"

            })
            axios.get('http://localhost:3001/node/events').then(function (data) {
                console.log(data.data)
                dispatch({
	                type: "DONE FETCH EVENT",
	                payload: data.data
            	})
            })
        })
    }
}