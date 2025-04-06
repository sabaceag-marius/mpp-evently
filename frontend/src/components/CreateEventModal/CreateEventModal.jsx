import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import style from './CreateEventModal.module.css';
import moment from 'moment';
import { addEventAPI } from '../../services/eventsService';
import { toDateTimeInputString } from '../../utils/momentUtils';
import FormModal from '../FormModal/FormModal';
function CreateEventModal({isOpen,closeModal,submitHandler,categories}) {
  
  const DEFAULT_FORM_DATA = {
    name : "",
    description : "",
    startDate : toDateTimeInputString(moment()),
    endDate : toDateTimeInputString(moment()),
    categoryName: "",
    userName : "Mark"
  }

  const [formData,setFormData] = useState(DEFAULT_FORM_DATA);
  const [errors,setErrors] = useState([]);
  
  function handleFormChange(event){
    const {name,value} = event.target;
    console.log(name,value);

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
					<input
						type="date"
						id="startDate"
						name="startDate"
						onChange={handleFormChange}
						value={formData.startDate}
					/>

					<select id="start-time" name="start-time">
						<option value="09:00">09:00 AM</option>
						<option value="12:00">12:00 PM</option>
						<option value="15:00">03:00 PM</option>
						<option value="18:00">06:00 PM</option>
					</select>
				</div>
			</div>
			
			<div className={style.inputGroup}>
				<label htmlFor="endDate">End Date</label>
				<div className={style.dateTimeGroup}>
					<input
						type="date"
						id="endDate"
						name="endDate"
						onChange={handleFormChange}
						value={formData.endDate}
					/>

					<select id="start-time" name="start-time">
						<option value="09:00">09:00 AM</option>
						<option value="12:00">12:00 PM</option>
						<option value="15:00">03:00 PM</option>
						<option value="18:00">06:00 PM</option>
					</select>
				</div>
			</div>

			<div className={style.inputGroup}>
				<label htmlFor="categoryName">Category</label>
				{categoryDropdown}
			</div>

			{errorsElements}
			<button className={`${style.submitButton} primary--button`}>Submit</button>
        </form>
      </div>
        
    </Modal>
  )
}

export default CreateEventModal;