import React from 'react';
import card from './EventCard.module.css';
import moment from 'moment';

// import { deleteEventAPI } from '../../services/eventsService';
import { Link } from 'react-router';
import { deleteEventAPI } from '../../services/eventsService';
import { getMoment } from '../../utils/momentUtils';

function EventCard({event, ref}) {
  
  const timeComponent = <div>{parseDates().map(t => <p key={t}>{t}</p>)}</div>;

  function parseDates(){
    const startMoment = getMoment(event.startDate);
    const endMoment = getMoment(event.endDate);

    if(startMoment.isSame(endMoment, 'day'))
      return [`${startMoment.format('Do MMM y')}`, `${startMoment.format('HH:mm')}-${endMoment.format('HH:mm')}`]
    
    return [`${startMoment.format('Do MMM y')} ${startMoment.format('HH:mm')}` ,`${endMoment.format('Do MMM y')} ${endMoment.format('HH:mm')}`]
  }

  const categoryColors = {
    'Work' : '#fcba03',
    'School' : '#a12a32',
    'Personal' : '#2860bf'
  }
  const borderStyle = {
    'borderTop' : `2rem solid ${categoryColors[event.categoryName]}`
  }

  const statisticsColors = {
    'top' : '#32a852',
    'average' : '#c4c932',
    'bottom' : '#ad1d0a'
  }

  return (

    <Link to={`/events/${event.id}`}>
      <div ref={ref} style={borderStyle} className={card.container}>
        <div>
          <h3 style={event.tag === null || {color : event.categoryColor}} className={card.title}>{event.name}</h3>
          <p className={card.username}>{event.username}</p>
          {event.tag === null || <p>{event.tag}</p>}
        </div>
        {timeComponent}
      </div>
    </Link>

  )
}

export default EventCard;
