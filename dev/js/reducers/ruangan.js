export default function (state = [], action) {
    switch (action.type) {
        case 'DONE FETCH RUANGAN':
            action.payload.forEach(function(item) {
                console.log(item);
                item.isEdit = 0;
            })
            return action.payload;
            break;
    }
    console.log(action.payload)
    return state;
}
