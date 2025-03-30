import React, { useEffect, useState } from 'react';
import './EventsPage.css';
import EventCard from '../../components/EventCard/EventCard';
import CreateEventModal from '../../components/CreateEventModal/CreateEventModal';
import { getEventsAPI, getEventsCountAPI } from '../../services/eventsService';
import moment from 'moment';
import Checkbox from '../../components/Checkbox/Checkbox';
import { toDateTimeInputString, toDateInputString, getRandomTimeBetween } from '../../utils/momentUtils';
import { arraysEqual } from '../../utils/arrayUtils';
import PageSelector from '../../components/PageSelector/PageSelector';
import { categoryData } from '../../services/eventsChartsService';
import CategoryChart from '../../components/CategoryChart/CategoryChart';
import EventsCountChart from '../../components/EventsCountChart/EventsCountChart';
import CategoryHoursChart from '../../components/CategoryChart/CategoryHoursChart';

function EventsPage() {

    // region Filters
    const categories = ['Work', 'School', 'Personal'];
    

    const DEFAULT_QUERY_DATA = {
        dateMoment : moment(),
        dateInterval : "day",
        categories : categories
    }


    const [queryData,setQueryData] = useState(DEFAULT_QUERY_DATA);

    function getDate(){
        
        return queryData.dateInterval === 'day' ? queryData.dateMoment.format('Do MMMM YYYY') : queryData.dateMoment.format('MMMM YYYY');
    }

    function incrementDate(){
        const {dateInterval, dateMoment} = queryData;

        setQueryData(prev => ({
            ...prev,
            dateMoment: dateMoment.clone().add(1,dateInterval)
        }))
    }

    function decrementDate(){
        const {dateInterval, dateMoment} = queryData;

        setQueryData(prev => ({
            ...prev,
            dateMoment: dateMoment.clone().subtract(1,dateInterval)
        }))
    }

    function setTodayDate(){
        setQueryData(prev =>({
            ...prev,
            dateMoment: moment()
        }))
    }

    function onChangeQuery(event) {

        let {name, value} = event.target;

        if(name === 'dateMoment') value = moment(value);
        
        setQueryData(prev => ({
            ...prev,
            [name]: value
        }));

    }
    
    // endregion

    // region Checkboxes

    function checkboxHandler(event){
        let {name, checked} = event.target;

        if(checked){
            setQueryData(prev =>({
                ...prev,
                categories : [...prev.categories,name]
            }));
        }
        else{
            setQueryData(prev =>({
                ...prev,
                categories : prev.categories.filter(c => c !== name)
            }));
        }
    }

    function checkboxAllHandler(event){
        let {name, checked} = event.target;

        if(checked){
            setQueryData(prev =>({
                ...prev,
                categories : categories
            }));
        }
        else{
            setQueryData(prev =>({
                ...prev,
                categories : []
            }));
        }

    }

    // endregion

    // region CreateModal
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }
    // endregion
    
    // region Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [pageSize, setPageSize] = useState(8);

    function onChangePageSize(event){
        const {value} = event.target;

        setPageSize(parseInt(value));
    }

    // endregion

    // region FetchData

    useEffect(() => {
        getEventsAPI(queryData, currentPage, pageSize).then(result =>{
            
            if(result === undefined) return;
            
            setEvents(result);

            categoryData(result);
        });

    }, [currentPage, pageSize]);

    // When we submit a query with different filters - fetch the pageCount and the transactions for the first page
    useEffect(() => {
        getEventsCountAPI(queryData).then(result =>{

            if(result === undefined) return;

            setPageCount(Math.ceil(result / pageSize));
        });

        // When we change the current page we fetch the transactions for that page
        // so we check before what is the current page to prevent fetching the data twice

        if(currentPage !== 1) {
            setCurrentPage(1);
        }
        else {
            getEventsAPI(queryData, currentPage, pageSize).then(result =>{
            
                if(result === undefined) return;
                
                setEvents(result);

                categoryData(result);
            });
        }

    }, [queryData]);

    // endregion

    // region Charts
    
    let insertionInterval;

    const [isInserting,setIsInserting] = useState(false);

    function insertRandomRecord(){
        
        const startTimeInterval = toDateTimeInputString(queryData.dateMoment.clone().startOf(queryData.dateInterval));
        const endTimeInterval = toDateTimeInputString(queryData.dateMoment.clone().endOf(queryData.dateInterval));
        
        let randomMoment = getRandomTimeBetween(startTimeInterval,endTimeInterval);

        const hours = [1,2,3];
        const hour = hours[Math.floor(Math.random()*hours.length)]

        const categories = ['Work', 'School', 'Personal']
        const event = {
            id : -1,
            userName: "Mark",
            name : "Generated Event",
            startDate : toDateTimeInputString(randomMoment),
            endDate : toDateTimeInputString(randomMoment.add(hour,'hour')),
            description : "",
            categoryName : categories[Math.floor(Math.random()*categories.length)]
        }

        setEvents(prev => [...prev, event]);
    }

    function startRandomInsertions() {

        const insertBatch = async () => {
                const promises = [];
                for (let i = 0; i < 2; i++) {
                    promises.push(insertRandomRecord());
                }
            await Promise.all(promises);
        };

        insertionInterval = setInterval(() => {
            insertBatch().catch(err => console.error('Random insertion error:', err));
        }, 5000);
    }

    function stopRandomInsertions() {
        clearInterval(insertionInterval);
            insertionInterval = null;
        
        if (insertionInterval) {
            clearInterval(insertionInterval);
            insertionInterval = null;
        }
    }

    function toggleInsertions(){

        console.log(isInserting);
        if (isInserting) {
            stopRandomInsertions();
        } else {
            startRandomInsertions();
        }
        setIsInserting(!isInserting);
    };
    // endregion

    const [events, setEvents] = useState([]);
    const eventsElements = events
    .filter(e => e.id !== -1)
    .map(e => <EventCard event={e} key={e.id} />);
    const checkboxElements = categories.map
    (c => <Checkbox label={c} id={c.toLowerCase()} isChecked={queryData.categories.includes(c)} checkHandler={checkboxHandler} />)
    
    return (
    <>
        <div className='main--container'>

            <div className='subheader'>

                <button className='primary--button' onClick={openModal}>Add +</button>
                <button onClick={setTodayDate} className='outline--button'>Today</button>


                <div className='date--selector'>
                    <button onClick={decrementDate} className="transparent--button material-symbols-outlined">chevron_left</button>
                    <button onClick={incrementDate} className="transparent--button material-symbols-outlined">chevron_right</button>

                    <h2>{getDate()}</h2>

                </div>

                <select
                    className='dark--dropdown'
                    id='dateInterval'
                    name='dateInterval'
                    onChange={onChangeQuery}
                    value={queryData.dateInterval}
                >
                    <option className='dark--option' value="day" >Day</option>
                    <option className='dark--option' value="week" >Week</option>
                    <option className='dark--option' value="month" >Month</option>
                </select>
            </div>

            <main>

                <div className='filter--section'>
                    
                    <h2>Filter</h2>

                    <form className='filter--form'>

                        <label htmlFor='dateMoment'>Date</label>
                        <input type='date'
                            id='dateMoment'
                            name='dateMoment'
                            value={toDateInputString(queryData.dateMoment)}
                            onChange={onChangeQuery}
                        />

                        <fieldset className='filter--fieldset'>
                            <label>Categories</label>
                            
                            <Checkbox id='all' label='All' isChecked={arraysEqual(queryData.categories,categories)} checkHandler={checkboxAllHandler}/>
                            {checkboxElements}
                        </fieldset>

                        <select
                            className='dark--dropdown'
                            id='pageSize'
                            name='pageSize'
                            onChange={onChangePageSize}
                            value={pageSize}
                        >
                            <option className='dark--option' value="4" >4</option>
                            <option className='dark--option' value="8" >8</option>
                            <option className='dark--option' value="16" >16</option>
                        </select>
                    </form>

                    <button style={{'marginTop':'2rem'}} className='primary--button' onClick={toggleInsertions}>Toggle Insertions</button>

                </div>
                
                <div className='events--section'>
                    {
                        events.length === 0 ? <p>There are no events!</p> : 
                        <>
                            <div className='events--list--view'>
                                {eventsElements}
                            </div>

                            <PageSelector pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage}/>

                            <div className='charts--section'>
                                <CategoryChart data={events} />
                                <EventsCountChart data={events} />
                                <CategoryHoursChart data={events} />
                            </div>
                        </>
                    }
                    
                </div>
            </main>

        </div>

        <CreateEventModal isOpen={isModalOpen} closeModal={closeModal} submitHandler={()=>{setQueryData(DEFAULT_QUERY_DATA)}} categories={categories} />
    </>
  )
}

export default EventsPage;