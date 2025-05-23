import React, { useState } from 'react'
import style from './RegisterPage.module.css';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { Link } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterPage(){

    const {registerUser} = useAuth();

    const DEFAULT_FORM_DATA = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
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

    function onSubmit(e){
        e.preventDefault();

    }

    return(

        <div className={style.center}>
            <div className={style.container}>

                <div className={style.formHeader}>
                    <h2>Register</h2>
                </div>

                <form className={style.formContent} onSubmit={onSubmit}>

                    <div className={style.inputGroup}>
                        <label htmlFor="name">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={handleFormChange}
                            value={formData.username}
                        />
                    </div>

                    <div className={style.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <PasswordInput
                            id="password"
                            name="password"
                            onChange={handleFormChange}
                            value={formData.password}
                        />
                    </div>

                    {/* {errorsElements} */}

                    <p>Already have an account?<Link to='/login'> Log-in</Link></p>
                    <button className={`${style.submitButton} primary--button`}>Register</button>
                </form>
            </div>
        </div>
    )

}