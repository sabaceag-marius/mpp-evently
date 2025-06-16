import React, { useEffect, useState } from "react";
import { MuiColorInput } from 'mui-color-input'
import { getCategoriesAPI, updateCategoriesRangeAPI } from "../../services/categoriesService";
import styles from "./CategoriesPage.module.css";
import ColorPicker from "../../components/ColorPicker/ColorPicker";
import { colors } from "@mui/material";
import { CreateCategoryModal } from "../../components/CreateCategoryModal/CreateCategoryModal";

export default function CategoriesPage({}){

    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    const [categories, setCategories] = useState([]);
    
    useEffect(() =>{


        getCategoriesAPI().then(data => {      
            setCategories(data);
        })
        
    }, []);

    function handleChange(id, value){
        const color = value.substring(1);
        
        setCategories(prevCategories => {
            const index = prevCategories.findIndex(e => e.id === id);
            if (index === -1) return prevCategories;
            
            // Create a new array with the updated category
            return prevCategories.map((category, i) => 
                i === index ? {...category, color, updated: true} : category
            );
        });
    }

    function ToCategoryComponent(category){
        return(
            <div key={category.id} className={styles.categoryComponent}>
                <h3>{category.name}</h3>
                

                <ColorPicker id={category.id} value={category.color} onChange={handleChange} />
                
            </div>
        )
    }

    function addCategory(category){
        setCategories([...categories, category])
    }

    async function saveCategories(){
        const changedCategories = categories.filter(c => c.updated);

        console.log("Changed categories: ", changedCategories);

        await updateCategoriesRangeAPI(changedCategories);
    }

    const categoryComponents = categories.map(c => ToCategoryComponent(c))

    return(
        <div className={styles.mainContainer}>
            
            <h2>Your categories</h2>

            <div className={styles.categoryContainer}>
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
            />
        </div>
    )

}