import axios from "axios";

const api = process.env.REACT_APP_API_URL;

export async function getCategoriesAPI(){

    try{
        const response = await axios.get(api+'/categories');
        return response.data;
    }
    catch(error){
        console.log(error);
    }

}

export async function updateCategoriesRangeAPI(categories){
    try{
        const response = await axios.put(api+'/categories/range', categories);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

export async function addCategoryAPI(category){

    try{
        const response = await axios.post(api+'/categories', category);
        return response.data;
    }
    catch(error){
        console.log(error);

        return {
            errorCode: error.response.status,
            errorMessages: error.response.data.split('\n')
        }
    }
}

