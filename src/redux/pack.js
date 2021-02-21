import { setLocalStorage } from "../utils/localStorage";

const dataInicial = {
  request: false,
  currentPack: {},
};

const CURRENT_PACK = "CURRENT_PACK";

export default function packReducer(state = dataInicial, action) {
  switch (action.type) {
    case CURRENT_PACK:
      return { ...state, currentPack: action.payload };

    default:
      return { ...state };
  }
}

export const setPackRedux = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_PACK,
    payload,
  });
};
