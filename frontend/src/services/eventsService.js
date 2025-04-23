import {data} from "./data";
import moment from "moment";
import axios from 'axios';
import '../utils/momentUtils';
import { getMoment, toDateTimeInputString } from "../utils/momentUtils";
import { useEffect } from "react";
import { useState } from "react";
import { restoreTextDirection } from "chart.js/helpers";

const api = 'https://localhost:2000/api';
// const api = 'http://192.168.1.8:2000/api';

const PAGE_SIZE = 15;

export function useEventQuery(query, pageNumber, setPageNumber){

    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() =>{
        setEvents([]);
        setPageNumber(1);
    },[query]);

    useEffect(() =>{
        setLoading(true);

        const queryRequest = setQuery(query,pageNumber);
        let cancel;

        axios.get(api+"/events",{
            params: queryRequest,
            paramsSerializer: {
                indexes: null, // no brackets at all
                },
            cancelToken: new axios.CancelToken(c => cancel = c)
            }
        ).then(result => {
            // Here we'll save the data for the connection dksafsdf
            const r = result.data;
            setEvents( prev => [... prev, ...r.events]);
            setLoading(false);
            setHasMore(PAGE_SIZE * pageNumber < r.count);

        }).catch(e => {
            if (axios.isCancel(e)) return;
            console.log(e);
        });

        return () => cancel();

    },[query,pageNumber]);

    return {loading, events, hasMore}
}

function setQuery(queryData, currentPage){

    const startTimeInterval = queryData.dateMoment.clone().startOf(queryData.dateInterval);
    const endTimeInterval = queryData.dateMoment.clone().endOf(queryData.dateInterval);

    const queryRequest = {

        startDate: toDateTimeInputString(startTimeInterval),
        endDate: toDateTimeInputString(endTimeInterval),
        categoriesList: queryData.categories.length > 0 ? queryData.categories.map(x => x.toLowerCase()) : null,
        pageNumber: currentPage,
        pageSize: PAGE_SIZE
    }

    return queryRequest;
}

export async function getEventsAPI(queryData, currentPage, pageSize) {

    const queryRequest = setQuery(queryData, currentPage, pageSize);

    try{
        const response = await axios.get(api+"/events",{
            params: queryRequest,
            paramsSerializer: {
                indexes: null, // no brackets at all
              }
            }
        );

        return addLengthStatistics(response.data.events);
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