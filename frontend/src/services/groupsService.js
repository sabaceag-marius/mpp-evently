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

export const getGroupInviteAPI = async (id) => {
    
    try{
        const response = await axios.get(api+"/groups/invite/"+id);
        return response.data;
    }
    catch (error){
        console.log(error);
    }
}

export const addGroupAPI = async (group) => {
    try{
        const response = await axios.post(api+'/groups', group);
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

export const joinGroupAPI = async (id) => {
    try{
        const response = await axios.post(api+'/groups/join/'+id);
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