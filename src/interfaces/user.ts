export interface IUser {
  api_token: string;
  busy: 0 | 1;
  created_at?: string;
  deleted_at?: string | null;
  dui: string | null;
  email: string;
  id?: number;
  info_device: unknown;
  name: string;
  online: 0 | 1;
  phone: number | string;
  photo?: string;
  profile_url: string | null;
  status: '1' | '0';
  suspended: 0 | 1;
  tag: unknown;
  updated_at?: string;
  data_bank_complete: 0 | 1;
  user_id?: number;
}
