import React, { useState } from 'react'
import style from './LoginPage.module.css';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { Link } from 'react-router';
import { login, useAuth } from '../../contexts/AuthContext';
export default function LoginPage(){

    const DEFAULT_FORM_DATA = {
        username: "",
        password: ""
    }
    
    const {loginUser} = useAuth();

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

        const result = await loginUser(formData.username,formData.password);

        if(result && result.errorMessage){
            setErrors(result.errorMessage);
            return;
        }

        setFormData(DEFAULT_FORM_DATA);
        setErrors(null);
    }

    const errorsElements = errors === null ? <p></p> : <p className={style.error} >{errors}</p>

    return(

        <div className={style.center}>
            <div className={style.container}>

                <div className={style.formHeader}>
                    <h2>Log in</h2>
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

                    {errorsElements}
                    <p>Don't have an account?<Link to='/register'> Register</Link></p>
                    <button className={`${style.submitButton} primary--button`}>Log in</button>
                </form>
            </div>
        </div>
    )

}