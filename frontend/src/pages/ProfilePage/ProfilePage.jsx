import React, { useEffect, useState } from "react";
import style from './ProfilePage.module.css';
import CheckboxInput from "../../components/Checkbox/Checkbox";
import { getUserAPI, saveUserAPI } from "../../services/userService";
import { color } from "chart.js/helpers";

export default function ProfilePage({}){

    const [user, setUser] = useState(null);

    const [saveMessage,setSaveMessage] = useState("");
    const [isError,setIsError] = useState(false);

    useEffect(()=>{
        getUserAPI().then(response => {
           setUser(response);
           console.log(response); 
        });
    },[]);
    
    function checkboxHandler(){
        setUser(prev => ({
            ...prev,
            twoFactorEnabled: !prev.twoFactorEnabled
        }))
    }

    async function onSubmit(e){
        e.preventDefault();

        const result = await saveUserAPI(user);
        console.log(result);
        setIsError(result.errorMessage);
        setSaveMessage(result.errorMessage || result);
    }

    const messageComponent = <p style={{"color" : isError ? "var(--error)" : "var(--success)" }}>{saveMessage}</p>

    return(
        <>
            <h1>Profile page</h1>

            {messageComponent}
            <h2>User settings</h2>
            <form className={style.form} onSubmit={onSubmit}>
                <div className={style.inputGroup}>
                    <label>Username</label>
                    <p>{user && user.userName}</p>
                </div>

                <div className={style.inputGroup}>
                    <label>Email</label>
                    <p>{user && user.email}</p>
                </div>

                <div className={style.inputGroup}>
                    <label htmlFor="twoFactorEnabled" >Enable Two Factor Authentification</label>
                    <CheckboxInput inputName="twoFactorEnabled" label=""
                     isChecked={user && user.twoFactorEnabled} checkHandler={checkboxHandler} />
                </div>

                <button className={`${style.submitButton} primary--button`}>Save changes</button>
            </form>
        </>
    )
}