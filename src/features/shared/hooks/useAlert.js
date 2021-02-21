import { useState } from "react";
import { Alert } from "antd";

const useAlert = () => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [data, setData] = useState({ message: "", type: "error" });

  const openAlert = ({ message, type = "error" }) => {
    setData({ message, type });
    setIsOpenAlert(true);
    setTimeout(() => setIsOpenAlert(false), 5000);
  };

  const renderAlert = () =>
    isOpenAlert && <Alert style={{ marginBottom: 10, marginTop: 10 }} message={data.message} type={data.type} />;
  return [renderAlert, openAlert];
};

export default useAlert;
