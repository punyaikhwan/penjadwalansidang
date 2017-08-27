export const moveEvent= (item) => {
    return function(dispatch) {

        dispatch({
            type: "MOVE EVENT",
            payload: item
        })

    }
}