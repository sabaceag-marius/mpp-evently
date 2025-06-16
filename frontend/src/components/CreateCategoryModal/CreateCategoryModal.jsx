import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import style from './CreateCategoryModal.module.css';
import moment from 'moment';
import { addEvent } from '../../services/eventsService';
import { getTimeOptions, toDateTimeString, toDateTimeInputString } from '../../utils/momentUtils';
import Dropdown from '../Dropdown/Dropdown';
import DateInput from '../DateInput/DateInput';
import ColorPicker from '../ColorPicker/ColorPicker';
import { addCategoryAPI } from '../../services/categoriesService';

export function CreateCategoryModal({isOpen,closeModal,submitHandler}) {
  
  const DEFAULT_FORM_DATA = {
    name : "",
    color : "1234af"
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

  function handleColorChange(value){
    
    setFormData(prev =>({
      ...prev,
      color:value.substring(1)
    }));
  }

  async function onSubmit(e){

    e.preventDefault();
    setErrors([]);
    
    const category = {
      ...formData
    }

    const result = await addCategoryAPI(category);

    if(result.errorCode !== undefined){
      setErrors(result.errorMessages);
      return;
    }

    setFormData(DEFAULT_FORM_DATA);
    setErrors([]);

    submitHandler(result);
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
       zIndex: 1000
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
      key={isOpen ? "modal-open" : "modal-closed"}
        isOpen = {isOpen}
        preventScroll={true}
        style={styling}
        onRequestClose={onClose}
        ariaHideApp={false}
    >

      <div className={style.modalContent}>
        
		<div className={style.modalHeader}>
			<h2>Create category</h2>
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
				<label htmlFor="color">Color</label>
          <ColorPicker value={formData.color} onChange={handleColorChange} />
			</div>

			{errorsElements}
			<button className={`${style.submitButton} primary--button`}>Submit</button>
        </form>
      </div>
        
    </Modal>
  )
}