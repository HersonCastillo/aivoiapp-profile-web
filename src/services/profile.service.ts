import { API_URL } from '../config/environments';
import { IAPIResponse } from '../interfaces/api-response';
import { IUser } from '../interfaces/user';
import axiosApi from '../utils/axios';
import { AIVOI_ROLES } from '../utils/roles';

export const updateProfile = (user: Partial<IUser>, role: AIVOI_ROLES) => {
  const path = `${API_URL}/${
    role === AIVOI_ROLES.CLIENT ? 'update_customer' : 'update_driver'
  }`;
  return axiosApi.post<IAPIResponse<IUser>>(path, user);
};

export const getUserData = (user_id: number) => {
  return axiosApi.post(`${API_URL}/get_user_data`, {
    user_id,
  });
};
