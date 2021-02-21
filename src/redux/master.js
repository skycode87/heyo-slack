import { setLocalStorage } from "../utils/localStorage";

const dataInicial = {
  request: false,
  currentMaster: {},
  currentMasterFather: {},
};

const CURRENT_MASTER = "CURRENT_MASTER";
const CURRENT_MASTER_FATHER = "CURRENT_MASTER_FATHER";

export default function masterReducer(state = dataInicial, action) {
  switch (action.type) {
    case CURRENT_MASTER:
      return { ...state, currentMaster: action.payload };
    case CURRENT_MASTER_FATHER:
      return { ...state, currentMasterFather: action.payload };

    default:
      return { ...state };
  }
}

export const setMasterRedux = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_MASTER,
    payload,
  });
};

export const setMasterFatherRedux = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_MASTER_FATHER,
    payload,
  });
};
