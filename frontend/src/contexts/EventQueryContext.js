import React, { createContext, useContext, useEffect, useState } from "react";
import { getMoment } from "../utils/momentUtils";
import { getCategoriesAPI } from "../services/categoriesService";


// const categories = ['Work', 'School', 'Personal'];

const DEFAULT_QUERY_DATA = {
    dateMoment : getMoment(),
    dateInterval : "Day",
    categories : []
}

const QueryDataContext = createContext();

export const QueryDataProvider = ({ children }) => {
    const [queryData, setQueryData] = useState(DEFAULT_QUERY_DATA);
    const [categories, setCategories] = useState([]);

    useEffect(() =>{

      getCategoriesAPI().then(data => {
        setQueryData(prev => ({
          ...prev,
          categories: data.map(c => c.id)
        }))
        // console.log(data);
        setCategories(data);
      })
      
    }, [])

    return (
      <QueryDataContext.Provider value={{ categories, queryData, setQueryData }}>
        {children}
      </QueryDataContext.Provider>
    );
};
  
export const useQueryData = () => useContext(QueryDataContext);