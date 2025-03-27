import {data} from "./data";
import moment from "moment";


export async function getEventsAPI(queryData, currentPage, PAGE_SIZE) {
    
    const start = (currentPage - 1)*PAGE_SIZE;
    const end = currentPage * PAGE_SIZE;

    const startTimeInterval = queryData.dateMoment.clone().startOf(queryData.dateInterval);
    const endTimeInterval = queryData.dateMoment.clone().endOf(queryData.dateInterval);
    
    let response = data.filter(event =>
        startTimeInterval <= moment(event.startDate) &&
        moment(event.startDate) <= endTimeInterval &&
        queryData.categories.includes(event.categoryName)
    )   
    
    const result = response.slice(start,end).sort((a,b) => moment(a.startDate).isBefore(moment(b.startDate)) ? -1 : 1);


    // console.log(result);
    return addLengthStatistics(result);
}

function addLengthStatistics(events){

    const lengths = events.map(event => ({
        'id' : event.id,
        'length' : Math.abs(moment.duration(moment(event.startDate).diff(moment(event.endDate))).asMinutes()) //Math.abs(moment(event.startDate).diff(moment(event.endDate), 'minutes', true))
    }))
    .sort((a,b) => - a.length + b.length);

    const num = 2;
    const topN = lengths.slice(0, num).map(e => e.id);
    const average = lengths.length > 1 ? lengths.slice(lengths.length/2,lengths.length/2+1).map(e => e.id) : lengths.map(e => e.id);
    const bottomN = lengths.slice(-num).map(e => e.id);
    
    events.forEach(element => {
        if(element.id in topN){
            element = {
                ...element,
                tag : "top"
            }
        }
        if(element.id in bottomN){
            element = {
                ...element,
                tag : "bottom"
            }
        }
        if(element.id in average){
            element = {
                ...element,
                tag: "average"
            }
        }
    });

    for(let i = 0; i < events.length; i++){

        if(topN.filter(e => e === events[i].id) > 0){
            
            events[i] = {
                ...events[i],
                tag : "top"
            }
        }

        if(bottomN.filter(e => e === events[i].id) > 0){

            events[i] = {
                ...events[i],
                tag : "bottom"
            }
        }

        if(average.filter(e => e === events[i].id) > 0){

            events[i] = {
                ...events[i],
                tag : "average"
            }
        }
    }

    return events;
}


export async function getEventAPI(id) {
    return data.filter(e => e.id === id)[0];
}

export async function getEventsCountAPI(queryData) {
    const startTimeInterval = queryData.dateMoment.clone().startOf(queryData.dateInterval);
    const endTimeInterval = queryData.dateMoment.clone().endOf(queryData.dateInterval);
    
    let response = data.filter(event =>
        startTimeInterval <= moment(event.startDate) &&
        moment(event.startDate) <= endTimeInterval &&
        queryData.categories.includes(event.categoryName)
    );

    return response.length;
}

export async function addEventAPI(event){

    const errors = validateEvent(event);

    if(errors.length > 0) return errors;

    const eventId = Math.max(...data.map(event => event.id)) + 1;

    data.push({
        id : eventId,
        ...event
    });

}

export async function updateEventAPI(id,event){

    const errors = validateEvent(event);

    if(errors.length > 0) return errors;

    const newEvent = {
        id: id,
        ...event
    };
    validateEvent(newEvent);

    await deleteEventAPI(id);

    data.push(newEvent);
    
}

export async function deleteEventAPI(id) {
    
    const index = data.indexOf(data.filter(e => e.id === id)[0]);
    data.splice(index,1);
}

export function validateEvent(event){
    let errors = []

    if(event.name === "") errors.push('Name is required')

    if(moment(event.endDate).isBefore(moment(event.startDate)))
        errors.push('End date must be after start date');

    if(event.categoryName === "") 
        errors.push('Category is required');
    return errors;
}