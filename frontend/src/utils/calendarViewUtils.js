import { getMoment, toDateTimeInputString, toDateTimeStringNoTimezone } from "./momentUtils"

export function toCalendarViewEvent(event, dateMoment, dateInterval){
    
    const eventView = {
        id: event.id,
        title: event.name,
        description: event.description,
        start: event.startDate,
        end: event.endDate,
        backgroundColor: '#'+event.categoryColor,
        categoryId: event.categoryId,
        // allDay: dateInterval === 'Day' 
        //     && getMoment(event.startDate).isSameOrBefore(dateMoment.startOf('day'))
        //     && getMoment(event.endDate).isSameOrAfter(dateMoment.endOf('day'))
    }
    
    return eventView;
}

export function getTimeFromDates(date){

}

export function toUpdateEventRequest(eventView){
    return{
        id: eventView.id,
        name: eventView.title,
        description: eventView.extendedProps.description,
        startDate: toDateTimeStringNoTimezone(eventView.start),
        endDate: toDateTimeStringNoTimezone(eventView.end),
        categoryId: eventView.extendedProps.categoryId
    }
}