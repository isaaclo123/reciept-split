import { Action, Failable, LOGIN_SUCCESS, LOGIN_FAIL } from "./index";

export interface TokenPayload {
  token: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export type LoginSuccessAction = Action<typeof LOGIN_SUCCESS, TokenPayload>;

export type LoginFailAction = Action<typeof LOGIN_FAIL, LoginErrors>;

export type LoginAction = LoginSuccessAction | LoginFailAction;

export interface LoginData {
  login: boolean;
  token: string;

  username: string;
  password: string;
}

export interface LoginErrors {
  username?: string;
  password?: string;
}

export type LoginState = Failable<LoginData, LoginErrors>;

export interface SignupPayload {
  username: string;
  fullname: string;
  password: string;
}

export interface SignupAction {
  type: string;
  payload: SignupPayload;
}