import axios from "axios";

const api = 'https://localhost:2000/api';
// const api = 'https://192.168.1.8:2000/api';

export async function getCategoriesAPI(){

    try{
        const response = await axios.get(api+'/categories');
        return response.data;
    }
    catch(error){
        console.log(error);
    }

}
