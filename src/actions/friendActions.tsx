import { Dispatch } from "redux";
import { batch } from "react-redux";
import { fetchFriends, fetchAddFriend } from "../api/index";
import {
  FRIEND_ADD_SUCCESS,
  FRIEND_ADD_FAIL,
  FRIEND_LIST_SUCCESS,
  FRIEND_LIST_FAIL
} from "../types/index";

import { ApiMiddlewareAction } from "../types/index";
import { getUser, apiCallAction } from "./index";

export const getFriends = (): ApiMiddlewareAction =>
  apiCallAction({
    successType: FRIEND_LIST_SUCCESS,
    failType: FRIEND_LIST_FAIL,
    withToken: true,
    apiCall: fetchFriends
  });

export const addFriend = (username: string): ApiMiddlewareAction =>
  apiCallAction({
    successType: FRIEND_ADD_SUCCESS,
    failType: FRIEND_ADD_FAIL,
    withToken: true,
    apiCall: fetchAddFriend,
    apiCallArgs: [username]
  });

export const getUserAndFriends = () => (dispatch: Dispatch) => {
  batch(() => {
    dispatch(getUser());
    dispatch(getFriends());
  });
};