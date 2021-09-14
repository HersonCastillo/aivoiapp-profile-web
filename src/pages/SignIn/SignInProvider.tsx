import React, { ReactElement, useContext, useState } from 'react';
import { AuthContext } from '../../store/auth.context';

const SignInProvider = ({ children }: ISignInProviderProps): ReactElement => {
  const context = useContext(AuthContext);
  const [contextValue, setContextValue] = useState(context);

  const setToken = (token: string) => {
    setContextValue({
      ...contextValue,
      token,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...contextValue,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

interface ISignInProviderProps {
  children: string | ReactElement | ReactElement[];
}

export default SignInProvider;
