export const tempEditKP= (item, id) => {
    return function(dispatch) {
        item[id].isEdit = 1;

        dispatch({
            type: "TEMP EDIT KP",
            payload: item
        })

    }
}