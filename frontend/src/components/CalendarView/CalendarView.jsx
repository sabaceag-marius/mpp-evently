import { useEffect, useRef } from "react";
import { updateEvent } from "../../services/eventsService";
import { useNavigate } from "react-router";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'
import { toCalendarViewEvent, toUpdateEventRequest } from '../../utils/calendarViewUtils';
import { getMoment } from "../../utils/momentUtils";

import './CalendarView.css';

export default function CalendarView({events, queryData, setQueryData, isModalOpen, openModal}){

    const navigate = useNavigate();

    const viewMap = {
        Month: "dayGridMonth",
        Week: "timeGridWeek",
        Day: "timeGridDay",
    };

    const calendarRef = useRef(null);

    useEffect(() => {
        if (calendarRef.current && queryData?.dateInterval && queryData?.dateMoment) {
            const calendarApi = calendarRef.current.getApi();
            const viewName = viewMap[queryData.dateInterval];
            if (viewName) {
                calendarApi.changeView(viewName, queryData.dateMoment.toDate());
            }
        }
    }, [queryData.dateInterval, queryData.dateMoment]);

    useEffect(() => {
        if (calendarRef.current) {
            const api = calendarRef.current.getApi();
            api.setOption('selectable', !isModalOpen);
            api.setOption('editable', !isModalOpen);
        }
    }, [isModalOpen]);
    
    function handleDateSelect(selectInfo){
        if(queryData.dateInterval === 'Day') {
            handleDayDateSelect(selectInfo);
            return;
        }

        setQueryData(prev => ({
            ...prev,
            dateInterval: 'Day',
            dateMoment: getMoment(selectInfo.startStr)
        }));
    }

    function handleDayDateSelect(selectInfo) {
        openModal({
            startTime: `${String(selectInfo.start.getHours()).padStart(2, '0')}:${String(selectInfo.start.getMinutes()).padStart(2, '0')}`,
            endTime: `${String(selectInfo.end.getHours()).padStart(2, '0')}:${String(selectInfo.end.getMinutes()).padStart(2, '0')}`,
        });
    }

    function handleEventClick(eventClickInfo){
        navigate(`/events/${eventClickInfo.event.id}`);   
    }

    async function handleEventResize(eventResizeInfo){

        const event = toUpdateEventRequest(eventResizeInfo.event);

        await updateEvent(event.id, event);
    }

    const calendarViewEvents = events.map(e => toCalendarViewEvent(e, queryData.dateMoment, queryData.dateInterval))

    return(

        <div className='events--calendar--view'>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                ref={calendarRef}
                initialDate={queryData.dateMoment?.toDate()}
                headerToolbar={false}
                initialView={viewMap[queryData.dateInterval] || "timeGridDay"} // Fallback
                
                editable={queryData.dateInterval === 'Day'}
                selectable={queryData.dateInterval === 'Day'}
                selectMirror={queryData.dateInterval === 'Day'}
                dayMaxEvents={2}
                fixedWeekCount={false}
                firstDay={1}
                allDaySlot={false}
                aspectRatio={2}
                events={calendarViewEvents}
                select={handleDateSelect}
                eventClick={handleEventClick}
                eventChange={handleEventResize}
            />
        </div>
    )
}