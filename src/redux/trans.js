import { setLocalStorage } from "../utils/localStorage";

const dataInicial = {
  request: false,
  currentTrans: {},
};

const CURRENT_TRANS = "CURRENT_TRANS";

export default function transReducer(state = dataInicial, action) {
  switch (action.type) {
    case CURRENT_TRANS:
      return { ...state, currentTrans: action.payload };

    default:
      return { ...state };
  }
}

export const setTrans = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_TRANS,
    payload,
  });
};

export const setTransRedux = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_TRANS,
    payload,
  });
};
