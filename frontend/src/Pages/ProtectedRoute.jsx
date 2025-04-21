import React from 'react';
import {useAuth} from "../api/AuthContext";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useAuth();
    console.log(isAuthenticated)

    if(!isAuthenticated){
        return <Navigate to="/login"></Navigate>
    } else {
        return children;
    }
}


export default ProtectedRoute;