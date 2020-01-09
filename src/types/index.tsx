import { rootReducer } from "../reducers/rootReducer";

export * from "./consts";

export * from "./balance";
export * from "./login";
export * from "./payment";
export * from "./reciept";
export * from "./signup";
export * from "./user";

export type RootState = ReturnType<typeof rootReducer>;

export interface ButtonProps {
  variant: string;
  text: string;
  handleClick: () => void;
}

export type Failable<T, E> = {
  error: boolean;
  data: T;
  errors: E;
};

export type Action<T, P> = {
  type: T;
  payload: P;
};
