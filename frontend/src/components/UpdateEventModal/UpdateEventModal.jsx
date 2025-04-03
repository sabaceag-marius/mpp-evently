import React, { useState } from 'react';
import Modal from 'react-modal';
import style from './UpdateEventModal.module.css';
import moment from 'moment';
import { addEventAPI, updateEventAPI } from '../../services/eventsService';
import { toDateTimeInputString } from '../../utils/momentUtils';

function  UpdateEventModal({event,isOpen,closeModal,submitHandler}) {
  
  const categories = ['Work', 'School', 'Personal'];

  const DEFAULT_FORM_DATA = {
    name : event.name,
    description : event.description,
    startDate : toDateTimeInputString(moment(event.startDate)),
    endDate : toDateTimeInputString(moment(event.endDate)),
    categoryName : event.categoryName,
    userName : event.userName
  }
  
  const [formData,setFormData] = useState(DEFAULT_FORM_DATA);
  const [errors,setErrors] = useState([]);

  function handleFormChange(event){
    const {name,value} = event.target;

    console.log(name, value);

    setFormData(prev =>({
        ...prev,
        [name]:value
    }));
    
  }

  async function onSubmit(e){
        
    e.preventDefault();
    setErrors([]);

    console.log(event);
    const result = await updateEventAPI(event.id, formData);
    
    if(result.errorCode !== undefined){
      setErrors(result.errorMessages);
      return;
    }


    setFormData(DEFAULT_FORM_DATA);
    setErrors([]);

    submitHandler();
    closeModal();

  }

  function onClose(){
        
    //Reset form data
    setFormData(DEFAULT_FORM_DATA);
    setErrors([]);
    closeModal();
  } 

  const styling = {
    overlay:{
      background : "transparent",
    },
    content:{

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        overflow: "default",
        background: "transparent",
        // filter: " blur(50%)"
    }
  }

  const categoryDropdown = <select
    id='categoryName'
    name='categoryName'
    onChange={handleFormChange}
    value={formData.categoryName}
  >
    <option value="">Select a category</option>
    {categories.map(c => <option selected={c === formData.categoryName} key={c} value={c}>{c}</option>)}
  </select>

  const errorsElements = errors.map(e => <p className={style.error} key={e}>{e}</p>)
  
  return (
    <Modal
        isOpen = {isOpen}
        preventScroll={true}
        style={styling}
        onRequestClose={onClose}
    >
        <div className={style.modal} >
          
          <div className={style.modalHeader}>
            
            <button
              className ="transparent--button material-symbols-outlined"
              style={{left : "0", position : "absolute"}}
              onClick={onClose}>close
            </button>

            <h2>Edit event</h2>

          </div>

          <form className={style.modalForm} onSubmit={onSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleFormChange}
              value={formData.name}
            />
            
            <label htmlFor="description">Description</label>
            <textarea
              // className="modal--input"
              id="description"
              name="description"
              onChange={handleFormChange}
              value={formData.description}
            />

            <label htmlFor="startDate">Start Date</label>
            <input
              type="datetime-local"
              id="startDate"
              name="startDate"
              onChange={handleFormChange}
              value={formData.startDate}
            />

            <label htmlFor="endDate">End Date</label>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              onChange={handleFormChange}
              value={formData.endDate}
            />

            {categoryDropdown}
            {errorsElements}

            <button className="primary--button">Submit</button>

          </form>
        </div>
    </Modal>
  )
}

export default UpdateEventModal;