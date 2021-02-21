import { setLocalStorage } from "../utils/localStorage";

const dataInicial = {
  request: false,
  currentBucket: {},
};

const CURRENT_BUCKET = "CURRENT_BUCKET";

export default function bucketReducer(state = dataInicial, action) {
  switch (action.type) {
    case CURRENT_BUCKET:
      return { ...state, currentBucket: action.payload };

    default:
      return { ...state };
  }
}

export const setBucket = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_BUCKET,
    payload,
  });
};

export const setBucketRedux = (payload) => async (dispatch, getState) => {
  setLocalStorage(payload);
  dispatch({
    type: CURRENT_BUCKET,
    payload,
  });
};
