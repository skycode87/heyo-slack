import { customFetch, FetchJson } from "../../helpers/fetch";
import { apiRoutes } from "../../constants/routes";

const saveUser = async (props = {}, { onSuccess, onError, onFinally } = {}) => {
  const { userId } = props;
  const method = userId ? "PUT" : "POST";
  const path = userId ? `${apiRoutes.USERS.SAVE_DATA}/${userId}` : `${apiRoutes.USERS.SAVE_DATA}`;

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

const getUser = async (userId = 0, { onSuccess, onError } = {}) => {
  try {
    const request = await FetchJson(`${apiRoutes.USERS.GET_DATA}/${userId}`, "GET");

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  }
};

const deleteUser = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
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

const archivedUser = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  const { _id } = params.user;
  const method = "PUT";
  const path = `${apiRoutes.USERS.ARCHIVED}/${_id}`;

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

const activeUser = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  const { _id, active } = params.user;
  const method = "PUT";
  const path = `${apiRoutes.USERS.ACTIVE}/${_id}`;

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
  const { userId } = props;
  const method = "POST";
  const path = `${apiRoutes.ASSIST.SAVE}/${userId}`;

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

const validateSessionUser = async ({ onSuccess, onError } = {}) => {
  try {
    const request = await FetchJson(`${apiRoutes.USERS.VALIDATE}`, "GET");
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

const getUsers = async ({ onSuccess, onError } = {}) => {
  try {
    const request = await FetchJson(`${apiRoutes.USERS.ALL}`, "GET");

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  }
};

export {
  getUser,
  getUsers,
  saveUser,
  deleteUser,
  archivedUser,
  activeUser,
  saveAssist,
  validateSessionUser,
  validateSessionRoot,
};
