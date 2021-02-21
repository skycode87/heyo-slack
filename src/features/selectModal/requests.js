import { FetchJson } from "../../helpers/fetch";
import { apiRoutes } from "../../constants/routes";

const saveApp = async (props = {}, { onSuccess, onError, onFinally } = {}) => {
  const { appId } = props;
  const method = appId ? "PUT" : "POST";
  const path = appId ? `${apiRoutes.APPS.SAVE_DATA}/${appId}` : `${apiRoutes.APPS.SAVE_DATA}`;

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

const getApp = async (appId = 0, { onSuccess, onError } = {}) => {
  try {
    const request = await FetchJson(`${apiRoutes.APPS.GET_DATA}/${appId}`, "GET");

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  }
};

const archivedApp = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  const { _id } = params.app;
  const method = "PUT";
  const path = `${apiRoutes.APPS.ARCHIVED}/${_id}`;

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

const activeApp = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  const { _id, active } = params.app;
  const method = "PUT";
  const path = `${apiRoutes.APPS.ACTIVE}/${_id}`;

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

export { getApp, saveApp, archivedApp, activeApp };
