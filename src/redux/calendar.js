import { setLocalStorage } from "../utils/localStorage";

const dataInicial = {
  request: false,
  currentCalendar: {},
};

const CURRENT_CALENDAR = "CURRENT_CALENDAR";

export default function calendarReducer(state = dataInicial, action) {
  switch (action.type) {
    case CURRENT_CALENDAR:
      return { ...state, currentCalendar: action.payload };

    default:
      return { ...state };
  }
}

export const setCalendar = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_CALENDAR,
    payload,
  });
};
