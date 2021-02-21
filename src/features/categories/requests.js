import { customFetch } from "../../helpers/fetch";
import { getFileName, downloadFile } from "../../utils/fileDownloadUtils";
import { apiRoutes } from "../../constants/routes";
import { loadingMode } from "../shared/components/Loading/constants";
import global from "../../state/global";

const exportCategoriesExcelFile = async (filters = {}, { onError } = {}) => {
  try {
    global.loader.showLoading(loadingMode.FAST);
    const response = await customFetch(apiRoutes.CATEGORIES.DOWNLOAD_EXCEL_FILE, {
      method: "POST",
      body: new URLSearchParams({ ...filters, category: filters.name }),
    });

    const fileName = getFileName(response?.headers, "Category.xls");
    const blob = await response.blob();

    downloadFile(blob, fileName);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  } finally {
    global.loader.hideLoading();
  }
};

const saveCategory = async (props = {}, { onSuccess, onError, onFinally } = {}) => {
  try {
    const request = await customFetch(apiRoutes.CATEGORIES.SAVE_DATA, {
      method: "POST",
      body: new URLSearchParams(props),
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

const getCategory = async (categoryId = 0, { onSuccess, onError } = {}) => {
  try {
    const request = await customFetch(apiRoutes.CATEGORIES.GET_DATA, {
      method: "POST",
      body: new URLSearchParams({
        action: "getCategoryData",
        categoryId,
      }),
    });

    const response = await request.json();
    const regions = [];
    response.regions.map((item) => regions.push({ value: item.id, label: item.text }));

    onSuccess({ ...response, originRegionIds: regions });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  }
};

const processCategoryMapping = async (params = {}, { onSuccess, onError } = {}) => {
  try {
    const request = await customFetch(apiRoutes.CATEGORIES.PROCESS_MAPPING, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(params),
    });
    const response = await request.json();

    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  }
};

const deleteCategory = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
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

export { exportCategoriesExcelFile, saveCategory, getCategory, processCategoryMapping, deleteCategory };
