import React from 'react';
import { IUser } from '../interfaces/user';
import { AIVOI_ROLES } from '../utils/roles';

export interface IProfileContext {
  user: IUser | null;
  userRole: AIVOI_ROLES | null;
  setProfile: (user: IUser, role: AIVOI_ROLES) => void;
}

const profileContextValues: IProfileContext = {
  user: null,
  userRole: null,
  setProfile: () => {},
};

export const ProfileContext = React.createContext(profileContextValues);

ProfileContext.displayName = 'ProfileContext';
