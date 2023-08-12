import React, { createContext, useContext, useState } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the authentication context
export function useAuth() {
    return useContext(AuthContext);
}

// Authentication provider component
export function AuthProvider({ children }) {
    let userLogin = sessionStorage.getItem('token') ? true : false
    const [isAuthenticated, setIsAuthenticated] = useState(userLogin);


    function logout(){
        console.log("222222222");
        sessionStorage.removeItem('token')
    }

    const value = {
        isAuthenticated,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
