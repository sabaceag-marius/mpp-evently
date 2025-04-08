import {data} from "./data";
import moment from "moment";
import axios from 'axios';
import '../utils/momentUtils';
import { getMoment, toDateTimeInputString } from "../utils/momentUtils";

const api = 'https://localhost:2000/api';

export async function getEventsAPI(queryData, currentPage, PAGE_SIZE) {
    
    const startTimeInterval = queryData.dateMoment.clone().startOf(queryData.dateInterval);
    const endTimeInterval = queryData.dateMoment.clone().endOf(queryData.dateInterval);

    const queryRequest = {

        startDate: toDateTimeInputString(startTimeInterval),
        endDate: toDateTimeInputString(endTimeInterval),
        categoriesList: queryData.categories.length > 0 ? queryData.categories.map(x => x.toLowerCase()) : [],
        pageNumber: currentPage,
        pageSize: PAGE_SIZE
    }

    try{
        const response = await axios.get(api+"/events",{
            params: queryRequest,
            paramsSerializer: {
                indexes: null, // no brackets at all
              }
            }
        );

        console.log(response.data);
        return addLengthStatistics(response.data);
    }
    catch (error){
        console.log(error);
    }
}

function addLengthStatistics(events){

    const lengths = events.map(event => ({
        'id' : event.id,
        'length' : Math.abs(moment.duration(getMoment(event.startDate).diff(getMoment(event.endDate))).asMinutes()) //Math.abs(moment(event.startDate).diff(moment(event.endDate), 'minutes', true))
    }))
    .sort((a,b) => - a.length + b.length);

    const num = 2;
    const topN = lengths.slice(0, num).map(e => e.id);
    const average = lengths.length > 1 ? lengths.slice(lengths.length/2,lengths.length/2+1).map(e => e.id) : lengths.map(e => e.id);
    const bottomN = lengths.slice(-num).map(e => e.id);

    for(let i = 0; i < events.length; i++){

        if(topN.filter(e => e === events[i].id).length > 0){
            
            events[i] = {
                ...events[i],
                tag : "top"
            }
        }

        if(bottomN.filter(e => e === events[i].id).length > 0){

            events[i] = {
                ...events[i],
                tag : "bottom"
            }
        }

        if(average.filter(e => e === events[i].id).length > 0){

            events[i] = {
                ...events[i],
                tag : "average"
            }
        }
    }
    // console.log(events);
    return events;
}

export async function getEventAPI(id) {

    try{
        const response = await axios.get(api+"/events/"+id);
        return response.data;
    }
    catch (error){
        console.log(error);
    }

}

export async function getEventsCountAPI(queryData) {

    const startTimeInterval = queryData.dateMoment.clone().startOf(queryData.dateInterval);
    const endTimeInterval = queryData.dateMoment.clone().endOf(queryData.dateInterval);
    
    const queryRequest = {

        startDate: toDateTimeInputString(startTimeInterval),
        endDate: toDateTimeInputString(endTimeInterval),
        categoriesList: queryData.categories.length > 0 ? queryData.categories.map(x => x.toLowerCase()) : []
    }

    try{
        const response = await axios.get(api+"/events/count",{
            params: queryRequest,
            paramsSerializer: {
                indexes: null, // no brackets at all
              }
            }
        );
        return response.data;
    }
    catch (error){
        console.log(error);
    }
}

export async function addEventAPI(event){

    const errors = validateEvent(event);

    console.log(errors);
    
    // if(errors.length > 0) {
    //     return errors;
    // }

    // const eventId = Math.max(...data.map(event => event.id)) + 1;

    // data.push({
    //     id : eventId,
    //     ...event
    // });

    try{
        const response = await axios.post(api + "/events", event);

        return response.data;
    }
    catch (error){
        console.log(error);

        return {
            errorCode: error.response.status,
            errorMessages: error.response.data.split('\n')
        }
    }
}

export async function updateEventAPI(id,event){

    const errors = validateEvent(event);
    event.id = id;
    try{
        const response = await axios.put(`${api}/events/${id}`,event);

        return response.data;

    }
    catch (error){
        console.log(error);

        return {
            errorCode: error.response.status,
            errorMessages: error.response.data.split('\n')
        }
    }
    
}

export async function deleteEventAPI(id) {
    try{
        const response = await axios.delete(`${api}/events/${id}`);
        return response.data;
    }
    catch (error){
        console.log(error);
    }
}

export function validateEvent(event){
    let errors = []

    if(event.name === "") errors.push('Name is required')

    if(getMoment(event.endDate).isBefore(getMoment(event.startDate)))
        errors.push('End date must be after start date');

    if(event.categoryName === "") 
        errors.push('Category is required');
    return errors;
}