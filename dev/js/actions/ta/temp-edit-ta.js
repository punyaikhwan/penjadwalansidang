export const tempEditTA= (item, id) => {
    return function(dispatch) {
        item[id].isEdit = 1;

        dispatch({
            type: "TEMP EDIT TA",
            payload: item
        })

    }
}