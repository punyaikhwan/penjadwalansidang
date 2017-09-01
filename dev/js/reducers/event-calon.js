export default function (state = [], action) {
    switch (action.type) {
        case 'DONE SCHEDULING':
            let tempEvent = action.payload.events;
            for (var i=0; i<tempEvent.length; i++) {
                tempEvent[i].start = new Date(tempEvent[i].start);
                tempEvent[i].end = new Date(tempEvent[i].end);
            }
            console.log("eventtss", tempEvent);
            return tempEvent;
            break;
        case 'FINALIZE':
            return [];
            break;
    }
    console.log(action.payload)
    return state;

}