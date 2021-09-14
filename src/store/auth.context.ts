import React from 'react';

export interface IAuthContext {
  token: string | null;
  setToken: (token: string) => void;
}

export const authContextValues: IAuthContext = {
  token: null,
  setToken: () => {},
};

export const AuthContext = React.createContext(authContextValues);

AuthContext.displayName = 'AuthContext';
