import {
  Dict,
  ReceiptDictState,
  ReceiptCacheAction,
  RECEIPT_ID_SUCCESS,
  RECEIPT_ID_FAIL
} from "../types/index";

import { setDataReducer, applyDataReducers, initState } from "./index";

const initialState: ReceiptDictState = initState({});

const assignToData = (data: Dict, payload: any) => {
  Object.assign({}, data, {
    [payload.id]: payload
  });
};

export const receiptDictReducer = applyDataReducers<
  ReceiptDictState,
  ReceiptCacheAction
>(initialState, [
  {
    reducerCreator: setDataReducer,
    args: [
      {
        successType: RECEIPT_ID_SUCCESS,
        failType: RECEIPT_ID_FAIL,
        onSuccess: assignToData,
        onFail: assignToData
      }
    ]
  }
]);
