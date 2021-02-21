import { FetchJson } from "../../helpers/fetch";
import { apiRoutes } from "../../constants/routes";

const saveCalendar = async (props = {}, { onSuccess, onError, onFinally } = {}) => {
  const { calendarId } = props;
  const method = calendarId ? "PUT" : "POST";
  const path = calendarId ? `${apiRoutes.CALENDARS.SAVE_DATA}/${calendarId}` : `${apiRoutes.CALENDARS.SAVE_DATA}`;

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

const getCalendar = async (calendarId = 0, { onSuccess, onError } = {}) => {
  try {
    const request = await FetchJson(`${apiRoutes.CALENDARS.GET_DATA}/${calendarId}`, "GET");

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  }
};

const getCalendars = async ({ onSuccess, onError } = {}) => {
  try {
    const request = await FetchJson(`${apiRoutes.CALENDARS.ALL}`, "GET");

    const response = await request.json();
    onSuccess(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    onError();
  }
};

const archivedCalendar = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  const { _id } = params.calendar;
  const method = "PUT";
  const path = `${apiRoutes.CALENDARS.ARCHIVED}/${_id}`;

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

const activeCalendar = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  const { _id, active } = params.calendar;
  const method = "PUT";
  const path = `${apiRoutes.CALENDARS.ACTIVE}/${_id}`;

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

const saveCalendarFromUser = async (props = {}, { onSuccess, onError, onFinally } = {}) => {
  const method = "POST";
  const path = `${apiRoutes.CALENDARS.SAVE_DATA}`;

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

const statusCalendar = async (params = {}, { onSuccess, onError, onFinally } = {}) => {
  const method = "POST";
  const path = `${apiRoutes.CALENDARS.STATUS}/${params._id}`;

  try {
    const request = await FetchJson(path, method, params);

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

export {
  getCalendar,
  saveCalendar,
  archivedCalendar,
  activeCalendar,
  saveCalendarFromUser,
  statusCalendar,
  getCalendars,
};
