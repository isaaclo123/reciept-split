import { Dispatch } from "redux";
import {
  Action,
  RootState,
  ApiMiddlewarePayload,
  API_MIDDLEWARE_TYPE,
  setValuePayload
} from "../types/index";

export const getToken = (getState: () => RootState) => {
  return getState().loginState.data.token;
};

export const apiCallAction = (payload: ApiMiddlewarePayload) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const {
    successType = null,
    failType = null,

    withToken,

    shouldCallApi = (state: any) => null,

    apiCall,
    apiCallArgs = [],

    onSuccess = (a: any) => a,
    onFail = (a: any) => a,

    afterSuccess = (dispatch, getState) => {},
    afterFail = (dispatch, getState) => {}
  }: ApiMiddlewarePayload = payload;

  const shouldCall = shouldCallApi(getState());

  const callData =
    shouldCall != null
      ? {
          error: false,
          errors: {
            error: "No Proper SuccessType Given, Speak with developer"
          },
          data: shouldCall
        }
      : await apiCall(
          ...(withToken ? [...apiCallArgs, getToken(getState)] : apiCallArgs)
        );

  const { error, errors, data } = callData;

  if (!error) {
    if (successType != null) {
      await dispatch({
        type: successType,
        payload: shouldCall != null ? data : onSuccess(data)
      });
    }

    if (afterSuccess != null) {
      await afterSuccess(dispatch, getState);
    }
  } else {
    if (failType != null) {
      await dispatch({
        type: failType,
        payload: shouldCall != null ? errors : onFail(errors)
      });
    }

    if (afterFail != null) {
      await afterFail(dispatch, getState);
    }
  }
};

export const setValueAction = <T extends {}>({
  successType,
  failType = null,
  validate = (a: T) => true
}: setValuePayload<T>) => (payload: T) => (dispatch: Dispatch) => {
  if (validate(payload)) {
    dispatch({
      type: successType,
      payload
    });
  } else if (failType != null) {
    dispatch({
      type: failType,
      payload
    });
  }
};
