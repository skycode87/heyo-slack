import { setLocalStorage } from "../utils/localStorage";

const dataInicial = {
  request: false,
  currentProfile: {},
};

const CURRENT_PROFILE = "CURRENT_PROFILE";

export default function profileReducer(state = dataInicial, action) {
  switch (action.type) {
    case CURRENT_PROFILE:
      return { ...state, currentProfile: action.payload };

    default:
      return { ...state };
  }
}

export const setProfile = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_PROFILE,
    payload,
  });
};

export const setProfileRedux = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_PROFILE,
    payload,
  });
};
