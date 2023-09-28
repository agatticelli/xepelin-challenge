'use client';
import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export type User = {
  username: string;
};

interface AuthContextData {
  isAuthenticated: boolean;
  user?: User;
}

const AuthContext = createContext<AuthContextData>({ isAuthenticated: false });
export const AuthProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: AuthContextData;
}) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
