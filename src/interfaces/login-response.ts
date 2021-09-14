import { IUser } from './user';

export interface ILoginResponse {
  token: string | null;
  user: IUser | null;
}
