import React, { createContext, useContext, useState } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the authentication context
export function useAuth() {
    return useContext(AuthContext);
}

// Authentication provider component
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Function to log the user in
    function login() {
        if (sessionStorage.getItem('token')) {
            console.log("111111111");
            setIsAuthenticated(true);
        }
    }

    function logout(){
        console.log("222222222");
        sessionStorage.removeItem('token')
    }

    const value = {
        isAuthenticated,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
