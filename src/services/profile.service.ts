import { API_URL } from '../config/environments';
import { IAPIResponse } from '../interfaces/api-response';
import { IBank } from '../interfaces/bank';
import { IDriverInfoRequest } from '../interfaces/driver-info-request';
import { IUser } from '../interfaces/user';
import axiosApi from '../utils/axios';
import { AIVOI_ROLES } from '../utils/roles';

export const updateProfile = (
  user: Partial<IUser>,
  role: AIVOI_ROLES,
  user_id: number,
) => {
  const path = `${API_URL}/${
    role === AIVOI_ROLES.CLIENT ? 'update_customer' : 'update_driver'
  }`;
  return axiosApi.post<IAPIResponse<IUser>>(path, {
    ...user,
    user_id,
  });
};

export const updateDriverDocumentData = (
  formData: Partial<IDriverInfoRequest>,
  user_id: number,
) => {
  return axiosApi.post<IAPIResponse<unknown>>(
    `${API_URL}/update_document_driver`,
    {
      ...formData,
      user_id,
    },
  );
};

export const getUserData = async (user_id: number) => {
  const { data } = await axiosApi.post<IAPIResponse<IUser>>(`${API_URL}/get_user_data`, {
    user_id,
  });
  return data;
};

export const getBanks = () => {
  return axiosApi.get<IAPIResponse<IBank[]>>(`${API_URL}/get_banks`);
};
