import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import './EventsPage.css';
import EventCard from '../../components/EventCard/EventCard';
import CreateEventModal from '../../components/CreateEventModal/CreateEventModal';
import { useEventQuery } from '../../services/eventsService';
import moment from 'moment';
import CheckboxInput from '../../components/Checkbox/Checkbox';
import { toDateTimeInputString, toDateInputString, getMoment } from '../../utils/momentUtils';
import { arraysEqual } from '../../utils/arrayUtils';
import PageSelector from '../../components/PageSelector/PageSelector';
import { categoryData } from '../../services/eventsChartsService';
import Dropdown from '../../components/Dropdown/Dropdown';
import DateInput from '../../components/DateInput/DateInput';
import { useQueryData } from '../../contexts/EventQueryContext';
import { useOfflineSupport } from '../../contexts/OfflineSupportContext';
import { getCategoriesAPI } from '../../services/categoriesService';

function EventsPage() {

    // region Filters
    // const categories = ['Work', 'School', 'Personal'];


    // const [categories,setCategories] = useState([]);

    const DEFAULT_QUERY_DATA = {
        dateMoment : getMoment(),
        dateInterval : "Day",
        categories : []
    }

    const [queryData, setQueryData] = useState(DEFAULT_QUERY_DATA);
    const [categories, setCategories] = useState([]);

    useEffect(() =>{

        getCategoriesAPI().then(data => {
        setQueryData(prev => ({
            ...prev,
            categories: data.map(c => c.id)
        }))
        
        setCategories(data);
        })
        
    }, []);

    // const {categories, queryData,setQueryData} = useQueryData();
    
    function getDate(){
        return queryData.dateInterval === 'Day' ? queryData.dateMoment.utc().format('Do MMMM YYYY') 
        : queryData.dateMoment.utc().format('MMMM YYYY');
    }

    function incrementDate(){
        const {dateInterval, dateMoment} = queryData;

        setQueryData(prev => ({
            ...prev,
            dateMoment: dateMoment.clone().add(1, dateInterval)
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
                categories : categories.map(c => c.id)
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
    (c => <CheckboxInput inputName={c.id} key={c.id} label={c.name} isChecked={queryData.categories.includes(c.id)} checkHandler={checkboxHandler} />)
    

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
    
    // region Events

    const [currentPage, setCurrentPage] = useState(1);
    const {events, hasMore, loading, resetQuery} = useEventQuery(queryData, currentPage, setCurrentPage);

    const observer = useRef();

    const eventElementRef = useCallback(node =>{
        
        if(loading) return;

        if(observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries =>{
            if(entries[0].isIntersecting && hasMore){
                setCurrentPage(prev => prev + 1);
            }
        });

        if(node) observer.current.observe(node);

    },[loading,hasMore]);

    // endregion

    // const [events, setEvents] = useState([]);
    // const eventsElements = events.map(e => <EventCard event={e} key={e.id} />);
    const eventsElements = events.map((e, index) => Math.floor(events.length / 3 * 2) === index ?  
        <EventCard ref = {eventElementRef} event={e} key={e.id} /> 
        :  <EventCard event={e} key={e.id} /> );
       
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
                            
                            <CheckboxInput id='all' label='All' isChecked={arraysEqual(queryData.categories,categories.map(c => c.id))} checkHandler={checkboxAllHandler}/>
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

                            {/* <PageSelector pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage}/> */}

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
            submitHandler={()=>{resetQuery()}} 
            categories={categories}
            currentMoment={queryData.dateMoment}
        />
    </>
  )
}

export default EventsPage;