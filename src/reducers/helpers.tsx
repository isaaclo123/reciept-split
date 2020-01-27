import {
  Dict,
  ReducerCreatorType,
  Action,
  Failable,
  SetDataReducerType,
  EditDataReducerType,
  DataReducerType,
  EDIT_DATA_PREPEND,
  EDIT_DATA_APPEND,
  EDIT_DATA_DELETE_GET_INDEX
} from "../types/index";

export const setDataReducer = (
  initialState: any,
  {
    successType,
    failType,
    onSuccess = (a: Dict, b: any) => b,
    onFail = (a: Dict, b: any) => b
  }: SetDataReducerType
) => (state: Failable<any, any>, action: Action<string, any>) => {
  switch (action.type) {
    case successType:
      return {
        error: false,
        data: onSuccess(state.data, action.payload),
        errors: initialState.errors
      };
    case failType:
      return Object.assign({}, state, {
        error: true,
        errors: onFail(state.errors, action.payload)
      });
    default:
      return state;
  }
};

export const editDataReducer = (
  initialState: any,
  { successType, field, isDelete = false }: EditDataReducerType
) => (state: Failable<any, any>, action: Action<string, any>) => {
  const assign = (
    payload: any,
    state: any,
    field: [string, boolean][],
    ids: number[]
  ): any => {
    if (field.length === 0) {
      return payload;
    }

    const [cur, ...rest] = field;
    const [key, hasindex] = cur;

    if (hasindex === false) {
      return Object.assign({}, state, {
        [key]: assign(payload, state[key], rest, ids)
      });
    }

    const [id, ...restIds] = ids;

    if (isDelete) {
      return Object.assign({}, state, {
        [key]: [...state[key].slice(0, id), ...state[key].slice(id + 1)]
      });
    }

    if (id === EDIT_DATA_PREPEND) {
      return Object.assign({}, state, {
        [key]: [payload, ...state[key]]
      });
    }

    if (id === EDIT_DATA_APPEND) {
      return Object.assign({}, state, {
        [key]: [...state[key], payload]
      });
    }

    return Object.assign({}, state, {
      [key]: [
        ...state[key].slice(0, id),
        assign(payload, state[key], rest, restIds),
        ...state[key].slice(id + 1)
      ]
    });
  };

  switch (action.type) {
    case successType:
      const { ids, data } = action.payload;
      return {
        error: state.data.error,
        data: assign(data, state.data, field, ids),
        errors: state.data.errors
      };
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
  const myresult = reducers.reduce((accState, { reducerCreator, args }) => {
    const result = reducerCreator(initialState, ...args)(accState, action);
    return result;
  }, state);
  return myresult;
};

export const insertIndex = <T extends {}>(
  state: T[],
  newItem: T,
  insertAt: number
) => {
  return [...state.slice(0, insertAt), newItem, ...state.slice(insertAt + 1)];
};

export const removeIndex = <T extends {}>(state: T[], deleteAt: number) => {
  return [...state.slice(0, deleteAt), ...state.slice(deleteAt + 1)];
};
