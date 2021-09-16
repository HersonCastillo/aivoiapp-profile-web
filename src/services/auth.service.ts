import { API_URL } from '../config/environments';
import { IAPIResponse } from '../interfaces/api-response';
import { ILoginResponse } from '../interfaces/login-response';
import axiosApi from '../utils/axios';
import { AIVOI_ROLES } from '../utils/roles';

export const recoverPassword = (email: string) => {
  return axiosApi.post<IAPIResponse<unknown>>(`${API_URL}/reset_password`, {
    email,
  });
};

export const doLogin = (email: string, password: string, role: AIVOI_ROLES) => {
  return axiosApi.post<IAPIResponse<ILoginResponse>>(`${API_URL}/login_user`, {
    email,
    password,
    role,
  });
};
