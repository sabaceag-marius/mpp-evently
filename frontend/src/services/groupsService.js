import axios from "axios";

const api = process.env.REACT_APP_API_URL;

export async function getGroupsAPI(){

    try{
        const response = await axios.get(api+'/groups');
        return response.data;
    }
    catch(error){
        console.log(error);
    }

}