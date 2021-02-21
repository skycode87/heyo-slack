import { FetchJson } from "../../helpers/fetch";
import { apiRoutes } from "../../constants/routes";

const saveTrans = async (props = {}, { onSuccess, onError, onFinally } = {}) => {
  const { transId } = props;
  const method = transId ? "PUT" : "POST";
  const path = transId ? `${apiRoutes.TRANS.SAVE_DATA}/${transId}` : `${apiRoutes.TRANS.SAVE_DATA}`;

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

const getTrans = async (planId = 0, { onSuccess, onError } = {}) => {
  try {
    const request = await FetchJson(`${apiRoutes.TRANS.GET_DATA}/${planId}`, "GET");

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  }
};

const archivedTrans = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  const { _id } = params.trans;
  const method = "PUT";
  const path = `${apiRoutes.TRANS.ARCHIVED}/${_id}`;

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

const activeTrans = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  const { _id } = params.trans;
  const method = "PUT";
  const path = `${apiRoutes.TRANS.ACTIVE}/${_id}`;

  try {
    const request = await FetchJson(path, method, { active: "" });

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

export { getTrans, saveTrans, archivedTrans, activeTrans };
