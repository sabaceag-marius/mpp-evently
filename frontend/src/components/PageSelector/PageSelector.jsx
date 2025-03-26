import React, {useEffect, useState} from 'react';
import "./PageSelector.css";

export default function PageSelector({currentPage,pageCount,setCurrentPage}) {


    function getIndexes(){
        if(!pageCount) return [];

        let list = [];

        if(currentPage < Math.ceil(maxNrButtons / 2)){

            for(let i = 0; i < Math.min(maxNrButtons,pageCount); i++){
                list.push(i+1);
            }
        }
        else if (currentPage + Math.ceil(maxNrButtons / 2) > pageCount){
            for(let i = Math.max(0,pageCount - maxNrButtons); i < pageCount; i++){
                list.push(i+1);
            }
        }
        else{
            for(let i = - Math.floor(maxNrButtons / 2); i <= Math.floor(maxNrButtons / 2); i++  ){
                list.push(i+currentPage);
            }
        }

        return list;
    }

    const maxNrButtons = 3;
    const buttonIndexes = getIndexes();

    const buttonComponents =
        buttonIndexes.map(idx =>
            <button key={idx} name={idx}
                    className={idx === currentPage ? "page--selector--button--selected" : "page--selector--button"}
                    onClick={onButtonPress}>{idx}
            </button>)

    function onButtonPress(e){
        const {name} = e.target;
        let newPage;

        if(name === "first-page") newPage = 1;
        else if(name === "last-page") {
            newPage = pageCount;
        }
        else newPage = parseInt(name);

        if(newPage === currentPage) return;

        setCurrentPage(newPage);
    }

    return (
        <div className="page--selector--container">
            <button name="first-page" onClick={onButtonPress} className="page--selector--button material-symbols-outlined">first_page</button>
            {buttonComponents}
            <button name="last-page" onClick={onButtonPress} className="page--selector--button material-symbols-outlined">last_page</button>
        </div>
    );
}

// PageSelector;