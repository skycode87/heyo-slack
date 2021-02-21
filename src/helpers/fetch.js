import { getToken } from "../utils/localStorage";

export const customFetch = (
  url,
  data = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: getToken(),
    },
  }
) => {
  const finalData = Object.assign(data);

  return fetch(url, finalData);
};

export const FetchJson = (url, method = "GET", params = {}) => {
  const data =
    method === "GET"
      ? {
          method,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: getToken(),
          },
        }
      : {
          method,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: getToken(),
          },
          body: JSON.stringify(params),
        };

  const finalData = Object.assign(data);

  return fetch(url, finalData);
};

export const FetchJsonMultipart = (url, method = "GET", params = {}) => {
  const data =
    method === "GET"
      ? {
          method,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: getToken(),
          },
        }
      : {
          method,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: getToken(),
          },
          body: JSON.stringify(params),
        };

  const finalData = Object.assign(data);

  return fetch(url, finalData);
};

export const FetchJsonWithouToken = (url, method = "GET", params = {}) => {
  const data =
    method === "GET"
      ? {
          method,
        }
      : {
          method,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: getToken(),
          },
          body: JSON.stringify(params),
        };

  const finalData = Object.assign(data);

  return fetch(url, finalData);
};

export const FetchGrid = (url, method = "GET", params = {}) => {
  const data =
    method === "GET"
      ? {
          method,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: getToken(),
          },
        }
      : {
          method,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: getToken(),
          },
          body: params,
        };

  const finalData = Object.assign(data);

  return fetch(url, finalData);
};
/*
const createCustomHeaders = () => {
  const { appInformation } = window._KOMET_REACT_APP;

  const CUSTOM_HEADERS = {
    "X-SESSION-TOKEN-US": appInformation.focusData,
    "X-SESSION-TOKEN-CP": appInformation.focusValue,
    "X-SESSION-TOKEN-GW": appInformation.focusValueGw,
    "X-SESSION-TOKEN-CU": appInformation.focusValueCu,
  };

  const token = document.querySelector("meta[name='_csrf']").getAttribute("content");
  const header = document.querySelector("meta[name='_csrf_header']").getAttribute("content");

  CUSTOM_HEADERS[header] = token;

  return CUSTOM_HEADERS;
};
*/
