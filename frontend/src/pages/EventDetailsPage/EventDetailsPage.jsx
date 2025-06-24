import React, { useEffect, useState } from 'react';
import { data, useNavigate, useParams } from 'react-router';
import { deleteEvent, getEvent } from '../../services/eventsService';
import UpdateEventModal from '../../components/UpdateEventModal/UpdateEventModal';
import style from './EventDetails.module.css';
import { getMoment } from '../../utils/momentUtils';

function EventDetailsPage() {

    const id = useParams().id;
    const [event,setEvent] = useState(null);
    
    useEffect(() =>{
        
        getEvent(id).then(r => setEvent(r));

    },[]);

    const navigate = useNavigate();

    // Edit Modal

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    function openUpdateModal(){
        setIsUpdateModalOpen(true);
    }

    function closeUpdateModal(){
        setIsUpdateModalOpen(false);
    }

    function submitUpdateModal(){
        navigate("/events");
    }

    var borderColor = event && event.categoryColor ? '#'+event.categoryColor : "var(--background)";

    const borderStyle = {
        'borderTop' : `2rem solid ${borderColor}`
    }

    const timeComponent = <div>{parseDates().map(t => <p key={t}>{t}</p>)}</div>;
    
    function parseDates(){
        if(event === null || event === undefined) return []

        const startMoment = getMoment(event.startDate);
        const endMoment = getMoment(event.endDate);

        if(startMoment.isSame(endMoment, 'day'))
            return [`${startMoment.format('Do MMM y')}`, `${startMoment.format('HH:mm')}-${endMoment.format('HH:mm')}`]
        
        return [`${startMoment.format('Do MMM y')} ${startMoment.format('HH:mm')}` ,`${endMoment.format('Do MMM y')} ${endMoment.format('HH:mm')}`]
    }

    function OnDeleteEvent(){
        deleteEvent(id).then(navigate('/events'));
    }

    return (
        <div className='center'>
            { event &&

                <div style={borderStyle} className={style.container}>
                    <div>
                        <h3 className={style.title}>{event.name}</h3>
                        <p className={style.username}>{event.userName}</p>
                    </div>
                    <p> {event.description}</p>

                    {timeComponent}

                    <div className={style.buttonContainer}> 

                        <button className='primary--button'
                        onClick={OnDeleteEvent}>Delete</button>

                        <button onClick={openUpdateModal} className='primary--button'>Edit</button>
                    </div>
                
                    <UpdateEventModal
                        isOpen={isUpdateModalOpen}
                        closeModal={closeUpdateModal}
                        submitHandler={submitUpdateModal}
                        event={event}
                    />
                </div>

            }
        </div>
    )
}

export default EventDetailsPage; 