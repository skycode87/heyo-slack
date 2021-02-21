import { FetchJson } from "../../helpers/fetch";
import { apiRoutes } from "../../constants/routes";

const savePlan = async (props = {}, { onSuccess, onError, onFinally } = {}) => {
  const { planId } = props;
  const method = planId ? "PUT" : "POST";
  const path = planId ? `${apiRoutes.PLANS.SAVE_DATA}/${planId}` : `${apiRoutes.PLANS.SAVE_DATA}`;

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

const savePlanContent = async (props = {}, { onSuccess, onError, onFinally } = {}) => {
  const { planId } = props;
  const method = planId ? "PUT" : "POST";
  const path = planId ? `${apiRoutes.PLANS.SAVE_DATA_CONTENT}/${planId}` : `${apiRoutes.PACKS.SAVE_DATA_CONTENT}`;

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

const getPlan = async (planId = 0, { onSuccess, onError } = {}) => {
  try {
    const request = await FetchJson(`${apiRoutes.PLANS.GET_DATA}/${planId}`, "GET");

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  }
};

const archivedPlan = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  const { _id } = params.plan;
  const method = "PUT";
  const path = `${apiRoutes.PLANS.ARCHIVED}/${_id}`;

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

const getPlans = async ({ onSuccess, onError } = {}) => {
  try {
    const request = await FetchJson(`${apiRoutes.PLANS.ALL}`, "GET");

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  }
};
export { getPlan, savePlanContent, savePlan, archivedPlan, activePlan, getPlans };
