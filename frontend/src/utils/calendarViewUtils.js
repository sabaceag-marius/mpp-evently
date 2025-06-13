import { toDateTimeInputString, toDateTimeStringNoTimezone } from "./momentUtils"

export function toCalendarViewEvent(event){
    return {
        id: event.id,
        title: event.name,
        description: event.description,
        start: event.startDate,
        end: event.endDate,
        backgroundColor: '#'+event.categoryColor,
        categoryId: event.categoryId,
    }
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