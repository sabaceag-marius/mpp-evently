import React, { Children } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function UnauthentificatedRoute({children,redirectPage}){

    const location = useLocation();
    const {isLoggedIn} = useAuth();
    return (

        !isLoggedIn() ?
        <>{children}</>
        :
        <Navigate to={redirectPage} state={{from: location}} replace></Navigate>
    )
}