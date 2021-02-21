import { FetchJson } from "../../helpers/fetch";
import { apiRoutes } from "../../constants/routes";

const saveProfile = async (props = {}, { onSuccess, onError, onFinally } = {}) => {
  const profileId = true;
  const method = profileId ? "PUT" : "POST";
  const path = profileId ? `${apiRoutes.PROFILE.SAVE_DATA}/${profileId}` : `${apiRoutes.PROFILE.SAVE_DATA}`;

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

const getProfile = async (profileId = 0, { onSuccess, onError } = {}) => {
  try {
    const request = await FetchJson(`${apiRoutes.PROFILE.GET_DATA}/${profileId}`, "GET");

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  }
};

const savePasswordProfile = async (props = {}, { onSuccess, onError, onFinally } = {}) => {
  const profileId = true;
  const method = "PUT";
  const path = `${apiRoutes.PROFILE.SAVE_PASSWORD}/${profileId}`;

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

export { saveProfile, getProfile, savePasswordProfile };
