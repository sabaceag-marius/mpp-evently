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