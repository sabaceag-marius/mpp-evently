import axios from 'axios';
import '../utils/momentUtils';
import { getMoment, toDateTimeInputString } from "../utils/momentUtils";
import { useEffect } from "react";
import { useState } from "react";
import { restoreTextDirection } from "chart.js/helpers";
import { useOfflineSupport } from "../contexts/OfflineSupportContext";
import { Guid } from 'js-guid';

const api = process.env.REACT_APP_API_URL;

const PAGE_SIZE = 15;


const getOfflineEvents = () =>{

    const saved = localStorage.getItem('events');

    if(!saved) return [];

    const events = JSON.parse(saved).sort((a,b) => getMoment(a.startDate).isBefore(getMoment(b.startDate)) ? -1 : 1);

    return events;
}

const setOfflineEvents = (events) =>{
    localStorage.setItem('events', JSON.stringify(events));
}

const addOfflineEvents = (events) => {

    setOfflineEvents([... getOfflineEvents(), ...events]);
}

export function useEventQuery(query, pageNumber, setPageNumber){

    const [loading, setLoading] = useState(true);

    const [hasMore, setHasMore] = useState(false);

    const {isOffline} = useOfflineSupport();

    const {queryEventsFunction} = useQueryEvents();
     
    const [events,setEvents] = useState([]);

    const initializeNewQuery = () => {

        if(!isOffline) {
            removeOfflineEvents();
        }

        setEvents([]);

        // We do this to trigger the 2nd useEffect
        setPageNumber(null);
    }

    useEffect(() =>{

        initializeNewQuery();

    },[query, isOffline]);

    useEffect(() =>{

        if(queryEventsFunction === null) return;

        if(pageNumber === null){
            setPageNumber(1);
            return;
        }

        setLoading(true);

        const queryRequest = setQuery(query,pageNumber);
        let cancel = null;

        queryEventsFunction(queryRequest, pageNumber, cancel)
        .then(result => {

            setEvents(prev => [...prev, ...result.events]);

            setLoading(false);
            setHasMore(PAGE_SIZE * pageNumber < result.count);

        }).catch(e => {
            if (axios.isCancel(e)) return;
            console.log(e);
        });


        if(cancel !== null) return () => cancel();

    }, [pageNumber, isOffline, queryEventsFunction]);

    const resetQuery = () => {
        initializeNewQuery();
    }

    return {loading, events, hasMore, resetQuery}
}

const removeOfflineEvents = () => {
    localStorage.removeItem('events');
}

export function useQueryEvents(){
    const queryEventsOffline = async (query, cancel) => {
        
        const events = getOfflineEvents();

        // console.log(events.map(e => getMoment(e.startDate)));

        const response = events.filter(event =>
            getMoment(query.startDate) <= getMoment(event.startDate) &&
            getMoment(event.startDate) <= getMoment(query.endDate )
            && (query.categoriesList === null || query.categoriesList.includes(event.categoryName.toLowerCase()))
        )   

        const start = (query.pageNumber - 1)*query.pageSize;
        const end = query.pageNumber * query.pageSize;
       
        return {
            count : response.length,
            events: response.slice(start, end).sort((a,b) => getMoment(a.startDate).isBefore(getMoment(b.startDate)) ? -1 : 1)
        }
    }

    const queryEventsOnline = async (query, cancel) => {

        var response = await axios.get(api+"/events",{
            params: query,
            paramsSerializer: {
                indexes: null, // no brackets at all
                },
            cancelToken: new axios.CancelToken(c => cancel = c)
            }
        );
        
        // console.log(response.data);

        addOfflineEvents(response.data.events);

        return response.data;

        // .then(result => {

        //     const r = result.data;
        //     const newEvents = [... getOfflineEvents(), ...r.events];
        //     console.log(r);
        //     // local storage for offline support

        //     setOfflineEvents(newEvents);
        //     setEvents(newEvents);
        //     setLoading(false);
        //     setHasMore(PAGE_SIZE * pageNumber < r.count);

        // }).catch(e => {
        //     if (axios.isCancel(e)) return;
        //     console.log(e);
        // });
    }

    const {isOffline} = useOfflineSupport();
    const [queryEventsFunction,setQueryEventsFunction] = useState(null);

    useEffect(() => {

        setQueryEventsFunction(isOffline ? (query, cancel) => queryEventsOffline : 
        (query, cancel) => queryEventsOnline);
        
    }, [isOffline]);

    return {queryEventsFunction};
}

export function useGetEvent() {

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

export function useAddEvent(){
    const {isOffline, addOperation} = useOfflineSupport();
    const [addEventFunction,setAddEventFunction] = useState(null);

    const addEventOffline = async (event) => {
        
        const errors = validateEvent(event);

        if(errors.length > 0){
            return {
                errorCode: 402,
                errorMessages: errors
            }
        }

        event.id = Guid.newGuid().toString();
        const events = getOfflineEvents();

        events.push(event);

        setOfflineEvents(events);

        // add to the sync operations
        addOperation(addEventOnline, [event]);

        return event;
    }

    const addEventOnline = async (event) => {
        
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

    useEffect(() => {
        setAddEventFunction(isOffline ? (event) => addEventOffline : (event) => addEventOnline);
    },[isOffline]);

    return {addEventFunction}
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

export function validateEvent(event){
    let errors = []

    if(event.name === "") errors.push('Name is required')

    if(getMoment(event.endDate).isSameOrBefore(getMoment(event.startDate)))
        errors.push('End date must be after start date');

    if(event.categoryName === "") 
        errors.push('Category is required');
    return errors;
}

function setQuery(queryData, currentPage){

    const startTimeInterval = queryData.dateMoment.clone().startOf(queryData.dateInterval);
    const endTimeInterval = queryData.dateMoment.clone().endOf(queryData.dateInterval);
    // console.log(queryData.dateMoment,startTimeInterval);
    const queryRequest = {

        startDate: toDateTimeInputString(startTimeInterval),
        endDate: toDateTimeInputString(endTimeInterval),
        categoryIds: queryData.categories.length > 0 ? queryData.categories : null,
        pageNumber: currentPage,
        pageSize: PAGE_SIZE
    }
    return queryRequest;
}