export default function (state = [], action) {
    switch (action.type) {
        case 'DONE SCHEDULING':
            return action.payload.events;
            break;
        case 'FINALIZE':
            return [];
            break;
    }
    console.log(action.payload)
    return state;

}