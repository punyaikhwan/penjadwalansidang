export const newEvent= (event) => {
    return function(dispatch) {

        dispatch({
            type: "NEW EVENT"
        })
        axios.post(nodeURL+'/events/new', {
            event: event
        }).then(function (data) {

            dispatch({
                type: "DONE NEW EVENT"

            })
            axios.get(nodeURL+'/events').then(function (data) {
                console.log(data.data)
                dispatch({
	                type: "DONE FETCH EVENT",
	                payload: data.data
            	})
            })
        })
    }
}