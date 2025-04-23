import React, { createContext, useContext, useState } from "react";
import { getMoment } from "../utils/momentUtils";


const categories = ['Work', 'School', 'Personal'];

const DEFAULT_QUERY_DATA = {
    dateMoment : getMoment(),
    dateInterval : "Day",
    categories : categories
}

const QueryDataContext = createContext();

export const QueryDataProvider = ({ children }) => {
    const [queryData, setQueryData] = useState(DEFAULT_QUERY_DATA);
    return (
      <QueryDataContext.Provider value={{ queryData, setQueryData }}>
        {children}
      </QueryDataContext.Provider>
    );
};
  
export const useQueryData = () => useContext(QueryDataContext);