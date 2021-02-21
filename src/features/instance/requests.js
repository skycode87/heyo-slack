import { FetchJson } from "../../helpers/fetch";
import { apiRoutes } from "../../constants/routes";

const saveInstance = async (props = {}, { onSuccess, onError, onFinally } = {}) => {
  const instanceId = true;
  const method = instanceId ? "PUT" : "POST";
  const path = instanceId ? `${apiRoutes.INSTANCE.SAVE_DATA}/${instanceId}` : `${apiRoutes.INSTANCE.SAVE_DATA}`;

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

const getInstance = async (instanceId = 0, { onSuccess, onError } = {}) => {
  try {
    const request = await FetchJson(`${apiRoutes.INSTANCE.GET_DATA}/${instanceId}`, "GET");

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  }
};

const activePlan = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  const { _id, active } = params.plan;
  const method = "PUT";
  const path = `${apiRoutes.PLANS.ACTIVE}/${_id}`;

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

export { saveInstance, activePlan, getInstance };
