import React, { createContext, useState, useContext } from 'react';

interface AuthContextData {
    isAuthenticated: boolean;
    role: string;
    login: (data: { username: string; password: string }) => void;
}
type AuthProviderType = {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderType) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState('');

    const login = (data: { username: string; password: string }) => {
        // Here you would normally make an API call to validate the user credentials
        // and get the role information. For this example, we'll just set the user as
        // authenticated and set the role to 'admin' for demonstration purposes.
        if(data.username.toLowerCase() == 'dilshan') {
            setIsAuthenticated(true);
            setRole('admin');
        }

    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated, role, login
            }}>
            {children}
        </AuthContext.Provider>
    )

};

export { AuthProvider, AuthContext};
