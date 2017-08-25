export default function (state = [], action) {
    switch (action.type) {
        case 'DONE FETCH KP':
            console.log(action.payload)
            action.payload.forEach(function(item) {
                console.log(item);
                item.isEdit = 0;
            })
            console.log(action.payload)
            return action.payload;
            break;
        case 'TEMP EDIT KP':
            return action.payload;
            break;
    }
    console.log(action.payload)
    return state;
}
