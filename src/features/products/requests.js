import { customFetch } from "../../helpers/fetch";
import { getFileName, downloadFile } from "../../utils/fileDownloadUtils";
import { apiRoutes } from "../../constants/routes";
import { loadingMode } from "../shared/components/Loading/constants";
import global from "../../state/global";

const exportProductsExcelFile = async (filters = {}, { onError } = {}) => {
  try {
    global.loader.showLoading(loadingMode.FAST);

    const response = await customFetch(apiRoutes.PRODUCTS.DOWNLOAD_EXCEL_FILE, {
      method: "POST",
      body: new URLSearchParams({ ...filters, variety: filters.product || "" }),
    });

    const fileName = getFileName(response?.headers, "Products.xls");
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

const loadKometCodeProductsAutocomplete = async (params, setOptions, { onSuccess, onError, onFinally } = {}) => {
  try {
    const response = await customFetch(apiRoutes.PRODUCTS.LOAD_KOMET_CODE_PRODUCTS_AUTOCOMPLETE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(params),
    });

    if (response.ok) {
      const result = await response.json();
      const dataCodeProducts = result.kometCodeProducts.map((item) => ({ label: item.description, value: item.id }));
      setOptions(dataCodeProducts);
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    onError();
  } finally {
    onFinally();
  }
};

const processProductMapping = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  try {
    const request = await customFetch(apiRoutes.PRODUCTS.PROCESS_MAPPING, {
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
  } finally {
    onFinally();
  }
};

export { exportProductsExcelFile, processProductMapping, loadKometCodeProductsAutocomplete };
