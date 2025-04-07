import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import style from './CreateEventModal.module.css';
import moment from 'moment';
import { addEventAPI } from '../../services/eventsService';
import { getTimeOptions, toDateTimeString, toDateTimeInputString } from '../../utils/momentUtils';
import FormModal from '../FormModal/FormModal';
import Dropdown from '../Dropdown/Dropdown';
import { DatePicker } from '@mui/x-date-pickers';
import DateInput from '../DateInput/DateInput';

function CreateEventModal({isOpen,closeModal,submitHandler,categories,currentMoment}) {
  
  const DEFAULT_FORM_DATA = {
    name : "",
    description : "",
    startDate : currentMoment,
    startTime: "00:00",
    endDate : currentMoment,
    endTime: "00:00",
    categoryName: "",
    userName : "Mark"
  }

  const [formData,setFormData] = useState(DEFAULT_FORM_DATA);
  const [errors,setErrors] = useState([]);
  
  function handleFormChange(event){

    const {name,value} = event.target;

    setFormData(prev =>({
        ...prev,
        [name]:value
    }));
  }

  function handleDateChange(name,value){
    
    setFormData(prev =>({
      ...prev,
      [name]:value
    }));
  }

  async function onSubmit(e){
        
    e.preventDefault();
    setErrors([]);
    
    const event = {
      ...formData,
      startDate: toDateTimeString(formData.startDate,formData.startTime),
      endDate: toDateTimeString(formData.endDate,formData.endTime)
    }

    console.log(event);

    const result = await addEventAPI(event);

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

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const errorsElements = errors.map(e => <p className={style.error} key={e}>{e}</p>)

  return (
    <Modal
        isOpen = {isOpen}
        preventScroll={true}
        style={styling}
        onRequestClose={onClose}
        ariaHideApp={false}
    >

      <div className={style.modalContent}>
        
		<div className={style.modalHeader}>
			<h2>Create event</h2>
			<button
				className = {`${style.closeButton} transparent--button material-symbols-outlined`}
				onClick={onClose}>close
			</button>
		</div>

        <form className={style.formContainer} onSubmit={onSubmit}>
			
			<div className={style.inputGroup}>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					id="name"
					name="name"
					onChange={handleFormChange}
					value={formData.name}
				/>
			</div>

			<div className={style.inputGroup}>
				<label htmlFor="description">Description</label>
				<textarea
					id="description"
					name="description"
					onChange={handleFormChange}
					value={formData.description}
				/>
			</div>

			<div className={style.inputGroup}>
				<label htmlFor="startDate">Start Date</label>
				<div className={style.dateTimeGroup}>

          <DateInput 
            id="startDate"
            onChange={handleDateChange}
            value={formData.startDate}
            name="startDate"
          />
          <Dropdown 
            optionsArray={getTimeOptions()}
            changeHandler={handleFormChange}
            inputName="startTime"
            currentValue={formData.startTime}
          />
				</div>
			</div>
			
			<div className={style.inputGroup}>
				<label htmlFor="endDate">End Date</label>
				<div className={style.dateTimeGroup}>
          <DateInput 
            id="endDate"
            onChange={handleDateChange}
            value={formData.endDate}
            name="endDate"
          />

          <Dropdown 
            optionsArray={getTimeOptions()}
            changeHandler={handleFormChange}
            inputName="endTime"
            currentValue={formData.endTime}
          />

				</div>
			</div>

      
			<div className={style.inputGroup}>
				<label htmlFor="categoryName">Category</label>
				{/* {categoryDropdown} */}
        <Dropdown 
          optionsArray={categories} 
          label="Category" 
          labelId="Category"
          changeHandler={handleFormChange}
          inputName="categoryName"
          currentValue={formData.categoryName}
        />
			</div>

			{errorsElements}
			<button className={`${style.submitButton} primary--button`}>Submit</button>
        </form>
      </div>
        
    </Modal>
  )
}

export default CreateEventModal;