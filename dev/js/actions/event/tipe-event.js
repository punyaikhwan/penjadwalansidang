export const tipeEvent= (id) => {
    return function(dispatch) {
        dispatch({
            type: "TIPE EVENT",
            payload: id
        })

    }
}