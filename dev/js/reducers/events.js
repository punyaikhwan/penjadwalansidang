export default function (state = [], action) {
    switch (action.type) {
        case 'DONE FETCH EVENT':
            let tempEvents = action.payload;
            for (var i=0; i<tempEvents.length; i++) {
                tempEvents[i].start = new Date(tempEvents[i].start);
                tempEvents[i].end = new Date(tempEvents[i].end);
            }
            console.log("eventtsss", tempEvents);
            return tempEvents;
            break;
        case 'MOVE EVENT':
            tempEvents = action.payload;
            for (var i=0; i<tempEvents.length; i++) {
                tempEvents[i].start = new Date(tempEvents[i].start);
                tempEvents[i].end = new Date(tempEvents[i].end);
            }
            console.log("eventtsss", tempEvents);
            return tempEvents;
            break;
    }
    return state;

}