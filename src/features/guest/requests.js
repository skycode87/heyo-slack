import { customFetch, FetchJson } from "../../helpers/fetch";
import { apiRoutes } from "../../constants/routes";
import { getToken } from "../../utils/localStorage";
import { loadingMode } from "../shared/components/Loading/constants";
import global from "../../state/global";

const saveGuest = async (props = {}, { onSuccess, onError, onFinally } = {}) => {
  const { guestId } = props;
  const method = guestId ? "PUT" : "POST";
  const path = guestId ? `${apiRoutes.GUESTS.SAVE_DATA}/${guestId}` : `${apiRoutes.GUESTS.SAVE_DATA}`;

  try {
    const request = await FetchJson(path, method, props);

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  } finally {
    onFinally();
  }
};

const getGuest = async (guestId = 0, { onSuccess, onError } = {}) => {
  try {
    const request = await FetchJson(`${apiRoutes.GUESTS.GET_DATA}/${guestId}`, "GET");

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  }
};

const deleteGuest = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  try {
    const request = await customFetch(apiRoutes.CATEGORIES.DELETE_CATEGORY, {
      method: "POST",
      body: new URLSearchParams(params),
    });

    const response = await request.json();

    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  } finally {
    onFinally();
  }
};

const archivedGuest = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  const { _id } = params.guest;
  const method = "PUT";
  const path = `${apiRoutes.GUESTS.ARCHIVED}/${_id}`;

  try {
    const request = await FetchJson(path, method, { archived: true });

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  } finally {
    onFinally();
  }
};

const activeGuest = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  const { _id, active } = params.guest;
  const method = "PUT";
  const path = `${apiRoutes.GUESTS.ACTIVE}/${_id}`;

  try {
    const request = await FetchJson(path, method, { active: !active });

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  } finally {
    onFinally();
  }
};

const saveAssist = async (props = {}, { onSuccess, onError, onFinally } = {}) => {
  const { guestId } = props;
  const method = "POST";
  const path = `${apiRoutes.ASSIST.SAVE}/${guestId}`;

  try {
    const request = await FetchJson(path, method, props);

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  } finally {
    onFinally();
  }
};

const validateSessionGuest = async ({ onSuccess, onError } = {}) => {
  try {
    const request = await FetchJson(`${apiRoutes.GUESTS.VALIDATE}`, "GET");
    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    // onError();
  }
};

const validateSessionRoot = async ({ onSuccess, onError } = {}) => {
  try {
    const request = await FetchJson(`${apiRoutes.ROOT.VALIDATE}`, "GET");
    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    // onError();
  }
};

export {
  getGuest,
  saveGuest,
  deleteGuest,
  archivedGuest,
  activeGuest,
  saveAssist,
  validateSessionGuest,
  validateSessionRoot,
};
