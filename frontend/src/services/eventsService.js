import axios from 'axios';
import '../utils/momentUtils';
import { getMoment, toDateTimeInputString } from "../utils/momentUtils";
import { useEffect } from "react";
import { useState } from "react";
import { restoreTextDirection } from "chart.js/helpers";
import { useOfflineSupport } from "../contexts/OfflineSupportContext";
import { Guid } from 'js-guid';
import { data } from 'react-router';

const api = process.env.REACT_APP_API_URL;

const PAGE_SIZE = 15;


export function useEventQuery(query, pageNumber, setPageNumber, calendarView, groupId){

    const groupMode = groupId !== undefined
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    const resetQuery = () =>{
        setEvents([]);
        setPageNumber(null);
    }

    useEffect(() =>{

        // Update this only if we go from the list view to the calendar view
        // and we didnt fetch all events

        if(calendarView && hasMore) resetQuery();
    },[calendarView]);

    useEffect(() =>{
        resetQuery();
    },[query]);

    useEffect(() =>{
        
        if(pageNumber === null){
            setPageNumber(1);
            return;
        }

        setLoading(true);

        const queryRequest = setQuery(query,pageNumber,calendarView, groupMode);
        let cancel;

        const url = groupMode ? `/groups/events/${groupId}` : '/events'

        axios.get(api+url,{
            params: queryRequest,
            paramsSerializer: {
                indexes: null, // no brackets at all
                },
            cancelToken: new axios.CancelToken(c => cancel = c)
            }
        ).then(result => {
            const r = result.data;
            setEvents( prev => [... prev, ...r.events]);
            setLoading(false);
            setHasMore(PAGE_SIZE * pageNumber < r.count);

        }).catch(e => {
            if (axios.isCancel(e)) return;
            console.log(e);
        });

        return () => cancel();

    },[pageNumber]);

    const updateStoredEvents = (id, startDate, endDate) => {
        setEvents(prevEvents => {
            const eventIndex = prevEvents.findIndex(event => event.id === id);
            if (eventIndex === -1) return prevEvents;
            
            const updatedEvents = [...prevEvents]; // shallow copy of the array
            updatedEvents[eventIndex] = {
                ...updatedEvents[eventIndex], // copy all existing properties
                startDate,                    // update startDate
                endDate                       // update endDate
            };
            
            return updatedEvents;
        });
    }

    return {loading, events, hasMore, resetQuery, updateStoredEvents, setEvents}
}

export const getEvent = async (id) => {
    
    try{
        const response = await axios.get(api+"/events/"+id);
        return response.data;
    }
    catch (error){
        console.log(error);
    }
}

export const addEvent = async (event) => {
        
    const errors = validateEvent(event);

    console.log(event);
    
    if(errors.length > 0){

        console.log(errors);

        return {
            errorCode: 402,
            errorMessages: errors
        }
    }

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

export const updateEvent = async (id,event) => {
        
    event.id = id;

    const errors = validateEvent(event);

    if(errors.length > 0){
        return {
            errorCode: 402,
            errorMessages: errors
        }
    }

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

export const deleteEvent = async (id) => {
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

    if(getMoment(event.endDate).isSameOrBefore(getMoment(event.startDate)))
        errors.push('End date must be after start date');

    if(event.categoryName === "") 
        errors.push('Category is required');
    return errors;
}

function setQuery(queryData, currentPage, fetchAllEvents,groupMode ){

    const startTimeInterval = queryData.dateMoment.clone().startOf(queryData.dateInterval);
    const endTimeInterval = queryData.dateMoment.clone().endOf(queryData.dateInterval);
    // console.log(queryData.dateMoment,startTimeInterval);
    const queryRequest = {

        startDate: toDateTimeInputString(startTimeInterval),
        endDate: toDateTimeInputString(endTimeInterval),
        categoryIds: [],
        pageNumber: currentPage,
        pageSize: PAGE_SIZE,
        fetchAllEvents : fetchAllEvents 
    }

    if(!groupMode)
        queryRequest.categoryIds = queryData.categories.length > 0 ? queryData.categories : null
    return queryRequest;
}