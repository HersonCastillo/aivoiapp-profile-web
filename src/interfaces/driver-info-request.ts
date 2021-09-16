export interface IDriverInfoRequest {
  user_id?: number;
  phone: string | number;
  photo: string | null;
  photo_dui: string;
  photo_licence: string;
  photo_background: string;
  photo_solvency_pnc: string;
  num_card_circulation: string;
  num_licence: string;
  bank_id: number;
  type_account: string;
  num_account: string | number;
}
