import { setLocalStorage } from "../utils/localStorage";

const dataInicial = {
  request: false,
  currentGuest: {},
};

const CURRENT_GUEST = "CURRENT_GUEST";

export default function guestReducer(state = dataInicial, action) {
  switch (action.type) {
    case CURRENT_GUEST:
      return { ...state, currentGuest: action.payload };

    default:
      return { ...state };
  }
}

export const setGuestRedux = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_GUEST,
    payload,
  });
};

export const setGuest = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_GUEST,
    payload,
  });
};
