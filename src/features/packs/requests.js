import { customFetch, FetchJson } from "../../helpers/fetch";
import { apiRoutes } from "../../constants/routes";

const savePack = async (props = {}, { onSuccess, onError, onFinally } = {}) => {
  const { packId } = props;
  const method = packId ? "PUT" : "POST";
  const path = packId ? `${apiRoutes.PACKS.SAVE_DATA}/${packId}` : `${apiRoutes.PACKS.SAVE_DATA}`;

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

const savePackContent = async (props = {}, { onSuccess, onError, onFinally } = {}) => {
  const { packId } = props;
  const method = packId ? "PUT" : "POST";
  const path = packId ? `${apiRoutes.PACKS.SAVE_DATA_CONTENT}/${packId}` : `${apiRoutes.PACKS.SAVE_DATA_CONTENT}`;

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

const getPack = async (packId = 0, { onSuccess, onError } = {}) => {
  try {
    const request = await FetchJson(`${apiRoutes.PACKS.GET_DATA}/${packId}`, "GET");

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  }
};

const getPacks = async ({ onSuccess, onError } = {}) => {
  try {
    const request = await FetchJson(`${apiRoutes.PACKS.ALL}`, "GET");

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  }
};

const deletePack = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
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

const archivedPack = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  const { _id } = params.pack;
  const method = "PUT";
  const path = `${apiRoutes.PACKS.ARCHIVED}/${_id}`;

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

const activePack = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  const { _id, active } = params.pack;
  const method = "PUT";
  const path = `${apiRoutes.PACKS.ACTIVE}/${_id}`;

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

export { getPack, getPacks, savePack, deletePack, archivedPack, activePack, saveAssist, savePackContent };
