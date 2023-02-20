import React, { createContext, useState, useEffect } from 'react';
import UserLogin from '../services/login';
interface AuthContextData {
  isAuthenticated: boolean;
  role: string;
  login: () => void;
}
type AuthProviderType = {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderType) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  const login = () => {
    const isAuth = UserLogin.checkAuth()
    if (isAuth && isAuth.isAuth && isAuth.role) {
      setIsAuthenticated(isAuth.isAuth);
      setRole(isAuth.role);
    }
  };

  useEffect(() => {
    login()
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuthenticated, role, login
    }}>
      {children}
    </AuthContext.Provider>
  )

};

export { AuthProvider, AuthContext };
