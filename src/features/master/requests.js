import { customFetch, FetchJson } from "../../helpers/fetch";
import { apiRoutes } from "../../constants/routes";

const saveMaster = async (props = {}, { onSuccess, onError, onFinally } = {}) => {
  const { masterId } = props;
  const method = masterId ? "PUT" : "POST";
  const path = masterId ? `${apiRoutes.MASTER.SAVE}/${masterId}` : `${apiRoutes.MASTER.SAVE}`;

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

const getMaster = async (masterId = 0, { onSuccess, onError } = {}) => {
  try {
    const request = await FetchJson(`${apiRoutes.MASTER.GET_DATA}/${masterId}`, "GET");

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  }
};

const deleteMaster = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
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

const archivedMaster = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  const { _id } = params.master;
  const method = "PUT";
  const path = `${apiRoutes.MASTER.ARCHIVED}/${_id}`;

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

const activeMaster = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  console.log(params.master.active);
  const { _id, active } = params.master;
  const method = "PUT";
  const path = `${apiRoutes.MASTER.ACTIVE}/${_id}`;

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

export { getMaster, saveMaster, deleteMaster, archivedMaster, activeMaster };
