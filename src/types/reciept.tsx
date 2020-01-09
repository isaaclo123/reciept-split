import { Failable, UserType, BalanceType, RECIEPT_SAVE_REQUEST } from "./index";

export interface RecieptPayload {
  id: number;
}

// export interface RecieptRequestAction {
//   type: string;
//   payload: RecieptPayload;
// }

export interface RecieptSetAction {
  type: typeof RECIEPT_SAVE_REQUEST;
  payload: RecieptType;
}

export interface RecieptAction {
  type: string;
  payload: RecieptState;
}

// reciept state

export type RecieptState = Failable<RecieptType, RecieptError>;

// reciept list
export interface RecieptListAction {
  type: string;
  payload: RecieptType[];
}

export type RecieptListState = Failable<RecieptType[], string[]>;

// server types

export type RecieptError = {
  id?: string;
  name?: string;
  amount?: string;
  date?: string;
  resolved?: string;
  user_id?: string;
  user?: string;
  users?: string;
  balances?: string;
  reciept_items?: string;
};

export type RecieptType = {
  id?: number;
  name: string;
  amount: number;
  date: string;
  resolved: boolean;
  user_id: number;
  user: UserType;
  users: UserType[];
  balances: BalanceType[];
  reciept_items: RecieptItemType[];
};

export type RecieptItemType = {
  id?: number;
  name: string;
  amount: number;
  users?: UserType[]; //TODO
  reciept_id?: number;
  reciept?: RecieptType;
};

const userListExample: UserType[] = [];

export const RecieptItemTypeDefault: RecieptItemType = {
  name: "New Reciept Item",
  amount: 0,
  users: userListExample
};
