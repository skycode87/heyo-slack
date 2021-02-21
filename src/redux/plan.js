import { setLocalStorage } from "../utils/localStorage";

const dataInicial = {
  request: false,
  currentPlan: {},
};

const CURRENT_PLAN = "CURRENT_PLAN";

export default function planReducer(state = dataInicial, action) {
  switch (action.type) {
    case CURRENT_PLAN:
      return { ...state, currentPlan: action.payload };

    default:
      return { ...state };
  }
}

export const setPlan = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_PLAN,
    payload,
  });
};

export const setPlanRedux = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_PLAN,
    payload,
  });
};
