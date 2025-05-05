import React, { useState } from "react";
import style from './PasswordInput.module.css';

export default function PasswordInput({id, name, value, onChange}){

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    }

    return(

        <div className={style.passwordInputContainer}>
            <input 
                className={style.passwordInput}
                type={showPassword ? "text" : "password"} 
                id={id} 
                name={name} 
                value={value}
                onChange={onChange}
                autoComplete="off"
            />
            <button type="button" onClick={toggleShowPassword} className={`material-symbols-outlined ${style.toggleButton}`}>
                {showPassword ? 'visibility_off' : 'visibility'}</button>
        </div>
    )

}