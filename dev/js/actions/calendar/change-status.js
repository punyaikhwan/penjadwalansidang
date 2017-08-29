export const changeStatus= (item) => {
    return function(dispatch) {
        dispatch({
            type: "CHANGE STATUS",
            payload: item
        })

    }
}