import { setting } from "../constants/routes";

export const setLocalStorage = (payload = {}) => {
  const cluufStorage = localStorage.getItem(setting.LOCAL_STORAGE);
  const currentLocal = JSON.parse(cluufStorage);
  localStorage.setItem(setting.LOCAL_STORAGE, JSON.stringify({ ...currentLocal, ...payload }));
};

export const getLocalStorage = () => JSON.parse(localStorage.getItem(setting.LOCAL_STORAGE));

export const getToken = () => {
  const { token } = JSON.parse(localStorage.getItem(setting.LOCAL_STORAGE));
  return token;
};

export const getUser = () => {
  const { user } = JSON.parse(localStorage.getItem(setting.LOCAL_STORAGE));
  return user;
};

export const getUserId = () => {
  const { user } = JSON.parse(localStorage.getItem(setting.LOCAL_STORAGE));
  return user._id;
};

export const isLocalStorage = () => {
  if (localStorage.getItem(setting.LOCAL_STORAGE)) {
    return true;
  }
  return false;
};
