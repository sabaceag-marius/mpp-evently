import axios from 'axios';
import '../utils/momentUtils';
import { getMoment, toDateTimeInputString } from "../utils/momentUtils";
import { useEffect } from "react";
import { useState } from "react";
import { restoreTextDirection } from "chart.js/helpers";
import { useOfflineSupport } from "../contexts/OfflineSupportContext";

// const api = 'https://localhost:2000/api';
const api = 'https://192.168.1.8:2000/api';

const PAGE_SIZE = 15;

export function useEventQuery(query, pageNumber, setPageNumber){

    const [loading, setLoading] = useState(true);
    // const [events, setEvents] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    const {isOffline} = useOfflineSupport();

    // const isOffline = false;

    // We'll store the events in local storage 
    const [events,setEvents] = useState(getOfflineEvents);

    // console.log(events);

    useEffect(() =>{

        if(isOffline) return;

        removeOfflineEvents();
        setEvents([]);
        setPageNumber(1);
    },[query, isOffline]);

    useEffect(() =>{
        console.log(":3");

        if(isOffline) {
            return;
        }

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

            const r = result.data;
            const newEvents = [... getOfflineEvents(), ...r.events];
            console.log(r);
            // local storage for offline support

            setOfflineEvents(newEvents);
            setEvents(newEvents);
            setLoading(false);
            setHasMore(PAGE_SIZE * pageNumber < r.count);

        }).catch(e => {
            if (axios.isCancel(e)) return;
            console.log(e);
        });

        return () => cancel();

    },[query,pageNumber, isOffline]);

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

const getOfflineEvents = () =>{

    const saved = localStorage.getItem('events');

    if(!saved) return [];

    const events = JSON.parse(saved).sort((a,b) => getMoment(a.startDate).isBefore(getMoment(b.startDate)) ? -1 : 1);

    return events;
}

const setOfflineEvents = (events) =>{
    localStorage.setItem('events', JSON.stringify(events));
}

const removeOfflineEvents = () => {
    localStorage.removeItem('events');
}

export function useEventDetail() {

    const getEventOffline = async (id) => {
        
        const events = getOfflineEvents();

        return events.filter(e => e.id == id)[0];
    }

    const getEventOnline = async (id) => {
        
        try{
            const response = await axios.get(api+"/events/"+id);
            return response.data;
        }
        catch (error){
            console.log(error);
        }
    }

    const {isOffline} = useOfflineSupport();
    const [getEventFunction,setGetEventFunction] = useState(null);

    useEffect(() => {

        setGetEventFunction(isOffline ? (id) => getEventOffline : (id) => getEventOnline)
        
    }, [isOffline]);

    return {getEventFunction}; 
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

export function useUpdateEvent(){

    const {isOffline, addOperation} = useOfflineSupport();
    const [updateEventFunction,setUpdateEventFunction] = useState(null);

    const updateEventOffline = async (id,event) => {
        
        event.id = id;

        const errors = validateEvent(event);

        if(errors.length > 0){
            return {
                errorCode: 402,
                errorMessages: errors
            }
        }

        const events = getOfflineEvents();

        const index = events.indexOf(events.filter(e => e.id === id)[0]);

        if(index === -1) return;

        events.splice(index,1);

        events.push(event);

        setOfflineEvents(events);

        // add to the sync operations
        addOperation(updateEventOnline, [id, event]);

        return event;
    }

    const updateEventOnline = async (id,event) => {
        
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

    useEffect(() => {
        setUpdateEventFunction(isOffline ? (id,event) => updateEventOffline : (id,event) => updateEventOnline);
    },[isOffline]);

    return {updateEventFunction}
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

export function useDeleteEvent(){

    const deleteEventOffline = async (id) => {

        const events = getOfflineEvents();

        const index = events.indexOf(events.filter(e => e.id === id)[0]);

        if(index === -1) return;

        events.splice(index,1);

        setOfflineEvents(events);
        
        addOperation(deleteEventOnline, [id]);
    }

    const deleteEventOnline = async (id) => {
        try{
            const response = await axios.delete(`${api}/events/${id}`);
            return response.data;
        }
        catch (error){
            console.log(error);
        }
    }

    const {isOffline, addOperation} = useOfflineSupport();
    const [deleteEventFunction,setDeleteEventFunction] = useState(null);

    useEffect(() => {
        setDeleteEventFunction(isOffline ? (id) => deleteEventOffline : (id) => deleteEventOnline);
        
    },[isOffline]);

    return {deleteEventFunction}
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