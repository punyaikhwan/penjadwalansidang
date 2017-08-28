export default function (state = false, action) {
    switch (action.type) {
        case 'DONE SCHEDULING':
            return false;
            break;
        case 'SCHEDULING':
            return true;
            break;
    }
    console.log(action.payload)
    return state;

}