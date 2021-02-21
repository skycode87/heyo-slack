import { setLocalStorage } from "../utils/localStorage";

const dataInicial = {
  request: false,
  currentInstance: {},
};

const CURRENT_INSTANCE = "CURRENT_INSTANCE";

export default function instanceReducer(state = dataInicial, action) {
  switch (action.type) {
    case CURRENT_INSTANCE:
      return { ...state, currentInstance: action.payload };

    default:
      return { ...state };
  }
}

export const setInstanceRedux = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_INSTANCE,
    payload,
  });
};
