import {
  ReceiptListState,
  ReceiptListAction,
  RECEIPT_LIST_SUCCESS,
  RECEIPT_LIST_FAIL,
  RECEIPT_INDEX_DELETE_MAP,
} from "../types/index";

import {
  createDeleteReducers,
  setDataReducer,
  applyDataReducers
} from "./index";

const initialState: ReceiptListState = {
  error: false,
  data: {
    receipts_owned: [],
    receipts_owed: [],
  },
  errors: {}
};

const deleteReducers = createDeleteReducers(RECEIPT_INDEX_DELETE_MAP);

export const receiptListReducer = applyDataReducers<
  ReceiptListState,
  ReceiptListAction
>(initialState,
  deleteReducers.concat([
  {
    reducerCreator: setDataReducer,
    args: [
      {
        successType: RECEIPT_LIST_SUCCESS,
        failType: RECEIPT_LIST_FAIL
      }
    ]
  },
]));
