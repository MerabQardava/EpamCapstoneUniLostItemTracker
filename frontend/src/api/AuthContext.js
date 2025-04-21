import React, {createContext, useContext, useState} from 'react';

const AuthContext=createContext({})

export const useAuth= ()=>useContext(AuthContext)

export const AuthProvider=({children})=>{
    const [isAuthenticated, setIsAuthenticated] = useState(()=>{
        return localStorage.getItem('isAuthenticated')==="true";
    });

    const login=()=>{
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated','true');
    }

    const logout=()=>{
        console.log(isAuthenticated)
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, login,logout}}>
            {children}
        </AuthContext.Provider>
    )

}



