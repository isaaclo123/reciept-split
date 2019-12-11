import { List } from 'immutable'
// login

export interface LoginData {
  username:string;
  password:string;
}

export interface LoginAction {
  type: string;
  payload: LoginData;
}

export interface LoginState {
  username: string;
  login: boolean;
}

// set login
//
export interface RecieptData {
  id: number;
}

export interface RecieptAction {
  type: string;
  payload: RecieptData;
}

export interface RecieptItem {
  name: string;
  amount: number;
  users: List<string>;
}

export interface RecieptState {
  name: string;
  amount: number;
  owner: string;
  users: List<string>;
  items: List<RecieptItem>;
}
