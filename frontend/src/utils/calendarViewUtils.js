
export function toCalendarViewEvent(event){
    return {
        title: event.name,
        start: event.startDate,
        end: event.endDate,
        backgroundColor: '#'+event.categoryColor
    }
}