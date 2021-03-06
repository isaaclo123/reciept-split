import { rootReducer } from "../reducers/rootReducer";
import { UserType } from "./user";

export * from "./api";
export * from "./setValue";
export * from "./consts";

export * from "./balance";
export * from "./friend";
export * from "./login";
export * from "./payment";
export * from "./receipt";
export * from "./user";

export const CURRENCY_FORMAT = {
  allowNegative: false,
  allowLeadingZeros: false,
  thousandSeparator: true,
  decimalSeparator: ".",
  decimalScale: 2,
  fixedDecimalScale: true
};

export interface LocationState {
  referrer: string;
}

export type RootState = ReturnType<typeof rootReducer>;

export interface ButtonProps {
  variant: string;
  text: string;
  handleClick: () => void;
};

export interface ErrorData {
  error?: string;
};

export type Failable<T, E> = {
  modified: boolean;
  error: boolean;
  data: T;
  errors: E;
};

export type Action<T, P> = {
  type: T;
  payload: P;
};

export type Dict<T = any> = {
  [propName: string]: T;
};

export type SetDataReducerType = {
  successType: string;
  failType: string;
  onSuccess?: (acc: any, cur: any) => any;
  onFail?: (acc: any, cur: any) => any;
  modified ?: boolean;
};

export type EditDataReducerType = {
  modified ?: boolean;
  successType: string;
  // failType: string;
  // onSuccess?: (acc: any, cur: any) => any;
  // onFail?: (acc: any, cur: any) => any;
  field: [string, boolean][];
  isDelete?: boolean;
};

export type ReducerCreatorType = (
  initialState: any,
  ...args: any[]
) => (state: Failable<any, any>, action: Action<string, any>) => any;

export type DataReducerType = {
  reducerCreator: ReducerCreatorType;
  args: any[];
};

export interface AcceptRejectRequest {
  id?: number;
  accepted: boolean | null;
  archived?: boolean;
  to_user: UserType;
  from_user: UserType;
}
