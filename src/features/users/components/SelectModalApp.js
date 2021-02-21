import { useState, useEffect } from "react";
import { Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";
import SelectModalApp from "../../selectModal/containers";
import ManagePlanModal from "../../selectModal/components/ManagePlanModal";
import { saveAppFromUser } from "../../apps/requests";
import { saveTrans } from "../../trans/requests";

const SelectModalAppComponent = ({
  getUser,
  userId,
  openModal,
  closeModal,
  refetch,
  initialValues,
  selectedUser,
  setReloadApp,
}) => {
  const [selectedRow, setSelectedRow] = useState({ name: "" });
  const [step, setStep] = useState("1");
  const [formData, setFormData] = useState({ userId, observation: "" });
  const { t, i18n } = useTranslation();

  const [loaderForm, setLoaderForm] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoaderForm(true);
      getUser(userId, {
        onSuccess: (response) => {
          setSelectedRow(response.user);
          setLoaderForm(false);
        },
        onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
      });
    } else {
      setSelectedRow(initialValues);
    }
  }, [userId]);

  const handleCloseModal = () => {
    refetch();
    closeModal();
  };

  const details = (data) => {
    setStep("2");
    setFormData({ ...formData, ...data, planId: data._id, userId: selectedUser });
    setSelectedRow(data);
  };

  const handleClick = (e) => {
    // eslint-disable-next-line no-unused-expressions
    e.key === "1" && setStep(e.key);
  };

  const submitData = () => {
    saveAppFromUser(formData, {
      onSuccess: (response) => {
        showGlobalNotification("success", t("inHorabuena"), t("successfulProcess"));
        saveTrans(formData, {
          onSuccess: (response2) => {
            showGlobalNotification("success", t("inHorabuena"), t("successfulProcessPayment"));
            setReloadApp(Math.floor(Math.random() * 1000000));
          },
          onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
          onFinally: () => closeModal(),
        });
      },
      onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
      onFinally: () => closeModal(),
    });
  };

  return (
    <BaseModal
      isOpenModal={openModal}
      closeModal={handleCloseModal}
      onCancel={handleCloseModal}
      onConfirm={() => submitData()}
      title={`Cliente: ${selectedUser?.firstname} ${selectedUser?.lastname}`}
      width={800}
      confirmText={t("save")}
      isCloseModal
      top={50}
    >
      <Menu onClick={handleClick} selectedKeys={[step]} mode="horizontal">
        <Menu.Item key="1" icon={<MailOutlined />}>
          Seleccion el plan
        </Menu.Item>
        <Menu.Item key="2" icon={<MailOutlined />}>
          Llene el formulario
        </Menu.Item>
      </Menu>
      <>
        {step === "1" && <SelectModalApp details={details} selectedUser={selectedRow} />}
        {step === "2" && (
          <>
            <ManagePlanModal setFormData={setFormData} formData={formData} dataRow={selectedRow} t={t} />
          </>
        )}
      </>
    </BaseModal>
  );
};

SelectModalAppComponent.defaultProps = {
  setUserId: () => {},
};

export default SelectModalAppComponent;
