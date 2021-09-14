import React, { ReactElement, useContext, useState } from 'react';
import { IUser } from '../../interfaces/user';
import { ProfileContext } from '../../store/profile.context';
import { AIVOI_ROLES } from '../../utils/roles';

const ProfileProvider = ({ children }: IProfileProviderProps): ReactElement => {
  const context = useContext(ProfileContext);
  const [profileContext, setProfileContext] = useState(context);

  const setProfile = (user: IUser, userRole: AIVOI_ROLES) => {
    setProfileContext({
      ...profileContext,
      user,
      userRole,
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        ...profileContext,
        setProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

interface IProfileProviderProps {
  children: string | ReactElement | ReactElement[];
}

export default ProfileProvider;
