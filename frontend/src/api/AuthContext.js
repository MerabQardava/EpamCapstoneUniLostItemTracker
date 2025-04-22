import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('isAuthenticated') === 'true';
    });

    const [userInfo, setUserInfo] = useState(() => {
        const stored = sessionStorage.getItem('userInfo');
        return stored ? JSON.parse(stored) : null;
    });

    const login = () => {
        setIsAuthenticated(true);
        sessionStorage.setItem('isAuthenticated', 'true');
    };

    const logout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('userInfo');
        setUserInfo(null);
    };

    const saveUserInfo = (info) => {
        sessionStorage.setItem('userInfo', JSON.stringify(info));
        setUserInfo(info);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userInfo, saveUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
