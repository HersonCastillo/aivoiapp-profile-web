import React, { ReactElement } from 'react';
import ProfileProvider from '../pages/Profile/ProfileProvider';
import SignInProvider from '../pages/SignIn/SignInProvider';

const Providers = ({ children }: IProvidersProps): ReactElement => (
  <ProfileProvider>
    <SignInProvider>
      {children}
    </SignInProvider>
  </ProfileProvider>
);

interface IProvidersProps {
  children: string | ReactElement | ReactElement[];
}

export default Providers;
