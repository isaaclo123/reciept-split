import {
  ReducerCreatorType,
  Action,
  Failable,
  SetDataReducerType,
  DataReducerType
} from "../types/index";

export const setDataReducer = (
  initialState: any,
  { successType, failType }: SetDataReducerType
) => (state: Failable<any, any>, action: Action<string, any>) => {
  switch (action.type) {
    case successType:
      return {
        error: false,
        data: action.payload,
        errors: initialState.errors
      };
    case failType:
      return Object.assign({}, state, {
        error: true,
        errors: action.payload //TODO
      });
    default:
      return state;
  }
};

export const applyDataReducers = <
  S extends Failable<any, any>,
  A extends Action<string, any>
>(
  initialState: S,
  reducers: DataReducerType[]
) => (state: S = initialState, action: A) => {
  // console.log("BEFORE STATE");
  // console.log(state);
  // console.log("END BEFORE STATE");

  const myresult = reducers.reduce((accState, { reducerCreator, args }) => {
    const result = reducerCreator(initialState, ...args)(accState, action);
    // console.log("MID STATE");
    // console.log(result);
    // console.log("MID STATE");
    return result;
  }, state);
  // console.log("AFTER STATE");
  // console.log(myresult);
  // console.log("AFTER STATE");
  return myresult;
};