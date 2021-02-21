import { customFetch, FetchJsonWithouToken } from "../../helpers/fetch";
import { apiRoutes } from "../../constants/routes";
import { loadingMode } from "../shared/components/Loading/constants";
import global from "../../state/global";

const login = async (params = {}, { onSuccess, onError, onFinish, onFail } = {}) => {
  try {
    // global.loader.showLoading(loadingMode.FAST);

    const response = await customFetch(apiRoutes.LOGIN.USER, {
      method: "POST",
      body: new URLSearchParams({ ...params }),
    });

    const result = await response.json();

    if (response.status === 400) {
      onFail(result);
    } else if (response.status === 200) {
      onSuccess(result);
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  } finally {
    // global.loader.hideLoading();
    onFinish();
  }
};

const loadBranding = async (alias = "", { onSuccess, onError } = {}) => {
  try {
    const request = await FetchJsonWithouToken(`${apiRoutes.INSTANCE.BY_ALIAS}/${alias}`, "GET");
    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    // onError();
  }
};

export { login, loadBranding };
