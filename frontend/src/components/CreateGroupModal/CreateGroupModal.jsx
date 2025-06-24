import { useEffect, useState } from 'react';
import style from './CreateGroupModal.module.css';
import Modal from 'react-modal';
import { addGroupAPI } from '../../services/groupsService';

export default function CreateGroupModal({isOpen,closeModal,submitHandler}){

    const DEFAULT_FORM_DATA = {
        name: "",
        description: ""
    }

    const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

    const [errors,setErrors] = useState([]);

    function handleFormChange(event) {

        const {name, value} = event.target

        setFormData(prev =>({
            ...prev,
            [name] : value
        }))
    }

    async function onSubmit(e){
    
        e.preventDefault();
        setErrors([]);
        
        const group = {
            ...formData
        }

        const result = await addGroupAPI(group);

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

    return(
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
                    <h2>Create group</h2>
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
                    
                    {errorsElements}
                    <button className={`${style.submitButton} primary--button`}>Submit</button>
                </form>
            </div>
        </Modal>
    )
}   