import { FetchJson, FetchJsonMultipart } from "../../helpers/fetch";
import { apiRoutes } from "../../constants/routes";

const saveBucket = async (props = {}, { onSuccess, onError, onFinally } = {}) => {
  const { bucketId } = props;
  const method = bucketId ? "PUT" : "POST";
  const path = bucketId ? `${apiRoutes.BUCKET.SAVE_DATA}/${bucketId}` : `${apiRoutes.BUCKET.SAVE_DATA}`;

  try {
    const request = await FetchJsonMultipart(path, method, props);

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

const updateBucket = async (props = {}, { onSuccess, onError, onFinally } = {}) => {
  const { bucketId } = props;
  const method = "PUT";
  const path = `${apiRoutes.BUCKET.SAVE_DATA}/${bucketId}`;

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

const saveImageBucket = async (info, { onSuccess, onError, onFinally } = {}) => {
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === "done") {
    onSuccess(info.file);
  } else if (info.file.status === "error") {
    onError();
  }
  onFinally();
};

const getBucket = async (bucketId = 0, { onSuccess, onError } = {}) => {
  try {
    const request = await FetchJson(`${apiRoutes.BUCKET.GET_DATA}/${bucketId}`, "GET");

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  }
};

const archivedBucket = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  const { _id } = params.bucket;
  const method = "PUT";
  const path = `${apiRoutes.BUCKET.ARCHIVED}/${_id}`;

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

const activeBucket = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  const { _id } = params.bucket;
  const method = "PUT";
  const path = `${apiRoutes.BUCKET.ACTIVE}/${_id}`;

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

export { getBucket, saveBucket, archivedBucket, activeBucket, saveImageBucket, updateBucket };
