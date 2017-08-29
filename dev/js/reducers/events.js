export default function (state = [], action) {
    switch (action.type) {
        case 'DONE FETCH EVENT':
            return action.payload;
            break;
        case 'MOVE EVENT':
            return action.payload;
            break;
    }
    console.log(action.payload)
    return state;

}