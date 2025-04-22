import React, { createContext, useContext, useState } from 'react';
import {getUserInfo} from "./AuthApiService";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('isAuthenticated') === "true";
    });

    const [userInfo, setUserInfo] = useState()

    const login = () => {
        setIsAuthenticated(true);
        sessionStorage.setItem('isAuthenticated', 'true');
    };

    const logout = () => {
        console.log(isAuthenticated);
        sessionStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
        setUserInfo(null)
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout,setUserInfo,userInfo}}>
            {children}
        </AuthContext.Provider>
    );
};
