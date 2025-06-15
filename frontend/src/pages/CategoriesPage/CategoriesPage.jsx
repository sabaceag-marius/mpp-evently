import React, { useEffect, useState } from "react";
import { MuiColorInput } from 'mui-color-input'
import { getCategoriesAPI } from "../../services/categoriesService";
import styles from "./CategoriesPage.module.css";

export default function CategoriesPage({}){

    const [categories, setCategories] = useState([]);
    
    useEffect(() =>{

        getCategoriesAPI().then(data => {      
            setCategories(data);
        })
        
    }, []);

    function ToCategoryComponent(category){
        return(
            <div key={category.id} className={styles.categoryComponent}>
                <h3>{category.name}</h3>
                <MuiColorInput inputProps={{ readOnly: true }} format= "hex" value={`#${category.color}`} />
            </div>
        )
    }

    const categoryComponents = categories.map(c => ToCategoryComponent(c))

    return(
        <div className='main--container'>
            {categoryComponents}
        </div>
    )

}