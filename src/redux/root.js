import { setLocalStorage } from "../utils/localStorage";

const dataInicial = {
  request: false,
  currentRoot: {},
};

const CURRENT_ROOT = "CURRENT_ROOT";

export default function rootReducer(state = dataInicial, action) {
  switch (action.type) {
    case CURRENT_ROOT:
      return { ...state, currentRoot: action.payload };

    default:
      return { ...state };
  }
}

export const save = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_ROOT,
    payload,
  });
};
