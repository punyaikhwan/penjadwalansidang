export default function (state = [], action) {
    switch (action.type) {
        case 'DONE FETCH CALENDAR':
            return action.payload;
            break;
        case 'CHANGE STATUS':
            return action.payload;
            break;
    }
    console.log(action.payload)
    return state;
}
