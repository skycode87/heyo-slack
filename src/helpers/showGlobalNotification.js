import { notification, message, Button, Space } from "antd";

const showGlobalNotification = (type = "success", title = null, description, duration = 4.5) => {
  if (typeof description === "undefined") {
    throw new Error("Description is required");
  }

  /*
  notification[type]({
    message: title || null,
    description,
    duration,
  });
  */
  if (type === "success") {
    message.success({
      content: description,
      className: "notification-alert-success",
      style: {
        marginTop: "2vh",
      },
      duration: 2,
    });
  }
  if (type === "error") {
    message.error({
      content: description,
      className: "custom-class",
      style: {
        marginTop: "2vh",
      },
      duration: 2,
    });
  }
  if (type === "warning") {
    message.warning({
      content: description,
      className: "custom-class",
      style: {
        marginTop: "2vh",
      },
      duration: 2,
    });
  }
};
export default showGlobalNotification;
