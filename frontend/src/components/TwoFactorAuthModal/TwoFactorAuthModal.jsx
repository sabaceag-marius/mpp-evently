import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import style from './TwoFactorAuthModal.module.css';
import moment from 'moment';
import { useAddEvent } from '../../services/eventsService';
import { getTimeOptions, toDateTimeString, toDateTimeInputString } from '../../utils/momentUtils';
import FormModal from '../FormModal/FormModal';
import Dropdown from '../Dropdown/Dropdown';
import { DatePicker } from '@mui/x-date-pickers';
import DateInput from '../DateInput/DateInput';
import { useAuth } from '../../contexts/AuthContext';

function TwoFactorAuthModal({isOpen,closeModal}) {
  
    const DEFAULT_FORM_DATA = {
        email: "",
        password: ""
    }

    const {loginUser2FA} = useAuth();

    const [formData,setFormData] = useState(DEFAULT_FORM_DATA);
    const [errors,setErrors] = useState([]);

  function handleFormChange(event){

    const {name,value} = event.target;

    setFormData(prev =>({
        ...prev,
        [name]:value
    }));
  }

  

  async function onSubmit(e){
        e.preventDefault();

        const result = await loginUser2FA(formData.email,formData.password);
        console.log(result);
        if(result && result.errorMessage){
            setErrors(result.errorMessage);
            return;
        }

        setFormData(DEFAULT_FORM_DATA);
        setErrors(null);
        closeModal();
    }

  function onClose(){
    //Reset form data
    setFormData(DEFAULT_FORM_DATA);
    setErrors(null);
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
        // justifyContent: "center",
        border: "none",
        overflow: "default",
        background: "transparent",
        // filter: " blur(50%)"
    }
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const errorsElements = <p className={style.error} >{errors || ""}</p>

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
            <h2>Two Factor Authentification</h2>
            <button
                className = {`${style.closeButton} transparent--button material-symbols-outlined`}
                onClick={onClose}>close
            </button>
        </div>
        <p>You recieved an email with your Token.</p>
        <p>Please write your account's email and the token.</p>
        <form className={style.formContainer} onSubmit={onSubmit}>
            <div className={style.inputGroup}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={handleFormChange}
                    value={formData.email}
                />
            </div>

            <div className={style.inputGroup}>
                <label htmlFor="password">Token</label>
                <input
                    id="password"
                    name="password"
                    onChange={handleFormChange}
                    value={formData.password}
                />
            </div>

            {errorsElements}
            <button className={`${style.submitButton} primary--button`}>Submit</button>
        </form>
      </div>
        
    </Modal>
  )
}

export default TwoFactorAuthModal;