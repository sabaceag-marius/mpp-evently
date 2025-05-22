import axios from "axios";
import { createContext } from "react";

const UserContext = createContext(null);

export const UserProvider = ({children}) => {

    return (
        <UserContext.Provider value={{loginUser, registerUser, logoutUser, deleteUser, user, token, isLoggedIn}}>
            {isReady ? children : null}
        </UserContext.Provider>
    )
}

export const useAuth = () => React.useContext(UserContext);

const api = 'https://localhost:2000/api';

export const login = async (formData) => {
    try{

        const response = await axios.post(api+'/users',formData);

        console.log(response.data);

        return response.data;
    }
    catch(error){
        // console.log(error);

        return {
            errorCode: error.response.status,
            errorMessages: error.response.data.split('\n')
        }
    }
}