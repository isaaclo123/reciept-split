import { RecieptListState, RecieptListAction } from "../types/index";

const initialState: RecieptListState = {
  //error: false,
  data: [],
  errors: []
};

export const recieptListReducer = (
  state: RecieptListState = initialState,
  action: RecieptListAction
) => {
  console.log("RECIPET_LIST_PAYLOAD");
  console.log(action.payload);
  console.log("RECIPET_LIST_PAYLOAD");

  switch (action.type) {
    case "RECIEPT_LIST_SUCCESS":
      return {
        //error: false,
        data: action.payload,
        errors: []
      };
    case "RECIEPT_LIST_FAIL":
      return Object.assign({}, state, {
        //error: true,
        errors: [] //TODO
      });
    default:
      return state;
  }
};
