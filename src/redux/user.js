import { setLocalStorage } from "../utils/localStorage";

const dataInicial = {
  request: false,
  currentUser: {},
};

const CURRENT_USER = "CURRENT_USER";

export default function userReducer(state = dataInicial, action) {
  switch (action.type) {
    case CURRENT_USER:
      return { ...state, currentUser: action.payload };

    default:
      return { ...state };
  }
}

export const setUser = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_USER,
    payload,
  });
};

export const setUserRedux = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_USER,
    payload,
  });
};
