import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import style from './CreateEventModal.module.css';
import moment from 'moment';
import { addEventAPI } from '../../services/eventsService';
import { getTimeOptions, toDateInputString, toDateTimeInputString } from '../../utils/momentUtils';
import FormModal from '../FormModal/FormModal';
import Dropdown from '../Dropdown/Dropdown';
import { DatePicker } from '@mui/x-date-pickers';
import DateInput from '../DateInput/DateInput';

function CreateEventModal({isOpen,closeModal,submitHandler,categories}) {
  
  const DEFAULT_FORM_DATA = {
    name : "",
    description : "",
    startDate : moment(),//toDateInputString(moment()),
    endDate : moment(),//toDateInputString(moment()),
    categoryName: "",
    userName : "Mark"
  }

  const [formData,setFormData] = useState(DEFAULT_FORM_DATA);
  const [errors,setErrors] = useState([]);
  
  function handleFormChange(event){
    console.log(event);
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

  async function onSubmit(event){
        
    event.preventDefault();
    setErrors([]);
    
    const result = await addEventAPI(formData);

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
  
  const categoryDropdown = <select
    id='categoryName'
    name='categoryName'
    onChange={handleFormChange}
    value={formData.categoryName}
  >
    <option value="">Select a category</option>
    {categories.map(c => <option key={c} value={c}>{c}</option>)}
  </select>

  const errorsElements = errors.map(e => <p className={style.error} key={e}>{e}</p>)

  return (
    <Modal
        isOpen = {isOpen}
        preventScroll={true}
        style={styling}
        onRequestClose={onClose}
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
					{/* <input
						type="date"
						id="startDate"
						name="startDate"
						onChange={handleFormChange}
						value={formData.startDate}
					/> */}
          {/* <DatePicker
            id="startDate"
            onChange={handleDateChange}
            value={formData.startDate}
          /> */}

          <DateInput 
            id="startDate"
            onChange={handleDateChange}
            value={formData.startDate}
            name="startDate"
          />
          <Dropdown 
            optionsArray={getTimeOptions()} 
            // label="Category" 
            // labelId="Category"
            // changeHandler={handleFormChange}
            // inputName="categoryName"
            // currentValue={formData.categoryName}
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
            // label="Category" 
            // labelId="Category"
            // changeHandler={handleFormChange}
            // inputName="categoryName"
            // currentValue={formData.categoryName}
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