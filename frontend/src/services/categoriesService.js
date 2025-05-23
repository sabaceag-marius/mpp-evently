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
