import { setLocalStorage } from "../utils/localStorage";

const dataInicial = {
  request: false,
  currentSession: {},
};

const CURRENT_SESSION = "CURRENT_SESSION";

export default function userReducer(state = dataInicial, action) {
  switch (action.type) {
    case CURRENT_SESSION:
      return { ...state, currentSession: action.payload };

    default:
      return { ...state };
  }
}

export const setSession = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_SESSION,
    payload,
  });
};

export const setSessionRedux = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_SESSION,
    payload,
  });
};
