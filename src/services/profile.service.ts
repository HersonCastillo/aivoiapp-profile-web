import { API_URL } from '../config/environments';
import { IAPIResponse } from '../interfaces/api-response';
import { IBank } from '../interfaces/bank';
import { IDriverInfoRequest } from '../interfaces/driver-info-request';
import { IUser } from '../interfaces/user';
import axiosApi from '../utils/axios';
import { AIVOI_ROLES } from '../utils/roles';

export const updateProfile = (user: Partial<IUser>, role: AIVOI_ROLES) => {
  const path = `${API_URL}/${
    role === AIVOI_ROLES.CLIENT ? 'update_customer' : 'update_driver'
  }`;
  return axiosApi.post<IAPIResponse<IUser>>(path, user);
};

export const updateDriverDocumentData = (
  formData: Partial<IDriverInfoRequest>,
) => {
  return axiosApi.post<IAPIResponse<unknown>>(
    `${API_URL}/update_document_driver`,
    formData,
  );
};

export const getUserData = (user_id: number) => {
  return axiosApi.post<IAPIResponse<IUser>>(`${API_URL}/get_user_data`, {
    user_id,
  });
};

export const getBanks = () => {
  return axiosApi.get<IAPIResponse<IBank[]>>(`${API_URL}/get_banks`);
};
