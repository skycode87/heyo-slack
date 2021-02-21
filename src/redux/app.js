import { setLocalStorage } from "../utils/localStorage";

const dataInicial = {
  request: false,
  currentApp: {},
};

const CURRENT_APP = "CURRENT_APP";

export default function appReducer(state = dataInicial, action) {
  switch (action.type) {
    case CURRENT_APP:
      return { ...state, currentApp: action.payload };

    default:
      return { ...state };
  }
}

export const setApp = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_APP,
    payload,
  });
};

export const setAppRedux = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_APP,
    payload,
  });
};
