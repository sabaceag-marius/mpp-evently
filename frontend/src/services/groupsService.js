import axios from "axios";

const api = process.env.REACT_APP_API_URL;

export const getGroupsAPI = async() => {

    try{
        const response = await axios.get(api+'/groups');
        return response.data;
    }
    catch(error){
        console.log(error);
    }

}

export const getGroupAPI = async (id) => {
    
    try{
        const response = await axios.get(api+"/groups/"+id);
        return response.data;
    }
    catch (error){
        console.log(error);
    }
}