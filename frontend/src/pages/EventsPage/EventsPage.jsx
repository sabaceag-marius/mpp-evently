import React, { useEffect, useState } from 'react';
import './EventsPage.css';
import EventCard from '../../components/EventCard/EventCard';
import CreateEventModal from '../../components/CreateEventModal/CreateEventModal';
import { getEventsAPI, getEventsCountAPI } from '../../services/eventsService';
import moment from 'moment';
import CheckboxInput from '../../components/Checkbox/Checkbox';
import { toDateTimeInputString, toDateInputString, getMoment } from '../../utils/momentUtils';
import { arraysEqual } from '../../utils/arrayUtils';
import PageSelector from '../../components/PageSelector/PageSelector';
import { categoryData } from '../../services/eventsChartsService';
import CategoryChart from '../../components/CategoryChart/CategoryChart';
import EventsCountChart from '../../components/EventsCountChart/EventsCountChart';
import CategoryHoursChart from '../../components/CategoryChart/CategoryHoursChart';
import Dropdown from '../../components/Dropdown/Dropdown';
import DateInput from '../../components/DateInput/DateInput';

function EventsPage() {

    // region Filters
    const categories = ['Work', 'School', 'Personal'];
    

    const DEFAULT_QUERY_DATA = {
        dateMoment : getMoment(),
        dateInterval : "Day",
        categories : categories
    }


    const [queryData,setQueryData] = useState(DEFAULT_QUERY_DATA);

    function getDate(){
        
        return queryData.dateInterval === 'Day' ? queryData.dateMoment.format('Do MMMM YYYY') : queryData.dateMoment.format('MMMM YYYY');
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
            dateMoment: getMoment()
        }))
    }

    function onChangeQuery(event) {

        let {name, value} = event.target;
        console.log(name, value);
        if(name === 'dateMoment') value = getMoment(value);
        
        setQueryData(prev => ({
            ...prev,
            [name]: value
        }));

    }

    function onChangeDateQuery(name,value) {
        
        setQueryData(prev => ({
            ...prev,
            [name]: value
        }));

    }
    
    // endregion

    // region Checkboxes

    function checkboxHandler(event){
        let {name, checked} = event.target;

        console.log(name);
        
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

    const checkboxElements = categories.map
    (c => <CheckboxInput inputName={c} key={c} label={c} isChecked={queryData.categories.includes(c)} checkHandler={checkboxHandler} />)
    

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
    const PAGE_SIZE = 8;

    // endregion

    // region FetchData

    useEffect(() => {
        getEventsAPI(queryData, currentPage, PAGE_SIZE).then(result =>{
            
            if(result === undefined) return;
            
            setEvents(result);

            categoryData(result);
        });

    }, [currentPage]);

    // When we submit a query with different filters - fetch the pageCount and the transactions for the first page
    useEffect(() => {

        getEventsCountAPI(queryData).then(result =>{

            if(result === undefined) return;

            setPageCount(Math.ceil(result / PAGE_SIZE));
        });

        // When we change the current page we fetch the transactions for that page
        // so we check before what is the current page to prevent fetching the data twice

        if(currentPage !== 1) {
            setCurrentPage(1);
        }
        else {
            getEventsAPI(queryData, currentPage, PAGE_SIZE).then(result =>{
            
                if(result === undefined) return;
                
                setEvents(result);

                categoryData(result);
            });
        }

    }, [queryData]);

    // endregion

    const [events, setEvents] = useState([]);
    const eventsElements = events.map(e => <EventCard event={e} key={e.id} />);
       
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

                <Dropdown inputName='dateInterval' changeHandler={onChangeQuery} currentValue={queryData.dateInterval} optionsArray={["Day","Week","Month"]} />
            </div>

            <main>

                <div className='filter--section'>
                    
                    <h2>Filter</h2>

                    <form className='filter--form'>

                        <label htmlFor='dateMoment'>Date</label>

                        <DateInput
                            id="dateMoment"
                            onChange={onChangeDateQuery}
                            value={queryData.dateMoment}
                            name="dateMoment"
                        />

                        <fieldset className='filter--fieldset'>
                            <label>Categories</label>
                            
                            <CheckboxInput id='all' label='All' isChecked={arraysEqual(queryData.categories,categories)} checkHandler={checkboxAllHandler}/>
                            {checkboxElements}
                        </fieldset>
                    </form>
                </div>
                
                <div className='events--section'>
                    {
                        events.length == 0 ? <p>There are no events!</p> : 
                        <>
                            <div className='events--list--view'>
                                {eventsElements}
                            </div>

                            <PageSelector pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage}/>

                            {/* <div className='charts--section'>
                                <CategoryChart data={events} />
                                <EventsCountChart data={events} />
                                <CategoryHoursChart data={events} />
                            </div> */}
                        </>
                    }
                    
                </div>
            </main>

        </div>

        <CreateEventModal 
            isOpen={isModalOpen} 
            closeModal={closeModal} 
            submitHandler={()=>{setQueryData(DEFAULT_QUERY_DATA)}} 
            categories={categories}
            currentMoment={queryData.dateMoment}
        />
    </>
  )
}

export default EventsPage;