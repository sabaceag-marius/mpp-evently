import axios from "axios";
import { handleError } from "../utils/arrayUtils";

const validateUserRegister = (formData) => {
    
    let errors = [];

    

    if(formData.password !== formData.confirmPassword){
        errors.push('Passwords do not match');
    }

    return errors;
}

const api = 'https://localhost:2000/api';

export async function loginAPI(username, password) {
    
    try{

        const response = await axios.post(api + '/users/login',{
            'username' : username,
            'password' : password
        });

        return response.data;

    }
    catch(error){
        return {
            errorMessage: handleError(error)
        };
    }

}
