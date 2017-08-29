export const tempEditRuangan= (item, id) => {
    return function(dispatch) {
        item[id].isEdit = 1;

        dispatch({
            type: "TEMP EDIT RUANGAN",
            payload: item
        })

    }
}