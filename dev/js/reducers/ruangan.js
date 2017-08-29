export default function (state = [], action) {
    switch (action.type) {
        case 'DONE FETCH RUANGAN':
            return action.payload;
            break;
    }
    console.log(action.payload)
    return state;
}
