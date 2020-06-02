import {
  ReceiptState,
  ReceiptIdAction,
  RECIEPT_ID_SUCCESS,
  RECIEPT_ID_FAIL,
  RECIEPT_SET_NAME,
  RECIEPT_SET_AMOUNT,
  RECIEPT_SET_DATE,
  RECIEPT_ADD_USER,
  RECIEPT_DELETE_USER,
  RECIEPT_ADD_RECIEPT_ITEM,
  RECIEPT_DELETE_RECIEPT_ITEM,
  RECIEPT_ITEM_SET_NAME,
  RECIEPT_ITEM_SET_AMOUNT,
  RECIEPT_ITEM_ADD_USER,
  RECIEPT_ITEM_DELETE_USER
} from "../types/index";

import { setDataReducer, editDataReducer, applyDataReducers } from "./index";

const initialState: ReceiptState = {
  error: false,
  data: {
    id: -1,
    name: "",
    amount: 0,
    date: "",
    resolved: false,
    user: {
      id: -1,
      fullname: "",
      username: ""
    },
    users: [],
    balances: [],
    receipt_items: []
  },
  errors: {}
};

export const receiptReducer = applyDataReducers<ReceiptState, ReceiptIdAction>(
  initialState,
  [
    {
      reducerCreator: setDataReducer,
      args: [
        {
          successType: RECIEPT_ID_SUCCESS,
          failType: RECIEPT_ID_FAIL
        }
      ]
    },
    {
      reducerCreator: editDataReducer,
      args: [
        {
          successType: RECIEPT_SET_NAME,
          field: [["name", false]]
        }
      ]
    },
    {
      reducerCreator: editDataReducer,
      args: [
        {
          successType: RECIEPT_SET_AMOUNT,
          field: [["amount", false]]
        }
      ]
    },
    {
      reducerCreator: editDataReducer,
      args: [
        {
          successType: RECIEPT_SET_DATE,
          field: [["date", false]]
        }
      ]
    },
    {
      reducerCreator: editDataReducer,
      args: [
        {
          successType: RECIEPT_ADD_USER,
          field: [["users", true]]
        }
      ]
    },
    {
      reducerCreator: editDataReducer,
      args: [
        {
          successType: RECIEPT_DELETE_USER,
          field: [["users", true]],
          isDelete: true
        }
      ]
    },
    {
      reducerCreator: editDataReducer,
      args: [
        {
          successType: RECIEPT_ADD_RECIEPT_ITEM,
          field: [["receipt_items", true]]
        }
      ]
    },
    {
      reducerCreator: editDataReducer,
      args: [
        {
          successType: RECIEPT_DELETE_RECIEPT_ITEM,
          field: [["receipt_items", true]],
          isDelete: true
        }
      ]
    },
    {
      reducerCreator: editDataReducer,
      args: [
        {
          successType: RECIEPT_ITEM_SET_NAME,
          field: [["receipt_items", true], ["name", false]]
        }
      ]
    },
    {
      reducerCreator: editDataReducer,
      args: [
        {
          successType: RECIEPT_ITEM_SET_AMOUNT,
          field: [["receipt_items", true], ["amount", false]]
        }
      ]
    },
    {
      reducerCreator: editDataReducer,
      args: [
        {
          successType: RECIEPT_ITEM_ADD_USER,
          field: [["receipt_items", true], ["users", true]]
        }
      ]
    },
    {
      reducerCreator: editDataReducer,
      args: [
        {
          successType: RECIEPT_ITEM_DELETE_USER,
          field: [["receipt_items", true], ["users", true]],
          isDelete: true
        }
      ]
    }
  ]
);