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

    const messageComponent = <p className={style.message} style={{"color" : isError ? "var(--error)" : "var(--success)" }}>{saveMessage}</p>

    return(

        <div className={style.mainContainer}>
            
            <h2>Profile page</h2>

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
            
                {messageComponent}

            </form>

            {/* <div className={styles.categoryContainer}>
                {categoryComponents}
            </div>

            <div className={styles.buttonContainer}>
                <button className="primary--button" onClick={openModal}>Add</button>
                <button className="primary--button" onClick={saveCategories}>Save</button>
            </div>

            <CreateCategoryModal 
                isOpen={isModalOpen}
                closeModal={closeModal}
                submitHandler={addCategory}
            /> */}
        </div>
    )
}