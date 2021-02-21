import { useState, useEffect } from "react";

import { Form, Row, Spin, Divider, Descriptions } from "antd";
import { getApp } from "../../apps/requests";

import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";

const moment = require("moment");

const ManageGuestModal = ({
  getGuest,
  guestId,
  openModal,
  closeModal,
  refetch,
  initialValues,
  setSelectedGuestMain,
  selectedApp,
  selectedGuestMain,
}) => {
  const [selectedGuest, setSelectedGuest] = useState(initialValues);
  const [form] = Form.useForm();
  const [requestData, setRequestData] = useState({});
  const [loaderForm, setLoaderForm] = useState(false);

  useEffect(() => {
    if (guestId) {
      setLoaderForm(true);
      // eslint-disable-next-line no-unused-expressions
      !selectedGuestMain &&
        getGuest(guestId, {
          onSuccess: (response) => {
            setSelectedGuest(response.result);
            setLoaderForm(false);
          },
          onError: () => showGlobalNotification("error", "Error", "error"),
        });
    } else {
      setSelectedGuest(initialValues);
    }
  }, [guestId]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
    if (selectedApp && selectedApp?._id) {
      setLoaderForm(true);
      getApp(selectedApp._id, {
        onSuccess: (response) => {
          setSelectedGuest({
            ...selectedGuest,
            appId: selectedApp._id,
            app: response.result,
            total: response.result.amount,
            amount: response.result.amount,
            fullname: `${response.result.userId.firstname} ${response.result.userId.lastname}`,
            email: `${response.result.userId.email}`,
            phone: `${response.result.userId.phone}`,
            pending: 0,
          });
          setLoaderForm(false);
        },
        onError: () => showGlobalNotification("error", "Error", "error"),
      });
    }
  }, [openModal]);

  useEffect(() => {
    if (requestData.message) {
      closeModal();
      showGlobalNotification("success", "Exitooo", requestData.message);
      if (!guestId) setSelectedGuest(initialValues);
      refetch();
    }
  }, [requestData]);

  useEffect(() => {
    setSelectedGuest(selectedGuestMain);
    console.log(selectedGuestMain);
  }, [selectedGuestMain]);

  const handleCloseModal = () => {
    refetch();
    closeModal();
  };

  useEffect(() => {
    console.log(selectedApp);
  }, [selectedApp]);

  useEffect(() => {
    console.log(selectedGuest);
  }, [selectedGuest]);

  return (
    <BaseModal
      isOpenModal={openModal}
      closeModal={handleCloseModal}
      onCancel={handleCloseModal}
      onConfirm={handleCloseModal}
      title="Más detalles de la guestacción"
      width={1000}
      confirmText=""
      isCloseModal
      top={70}
    >
      <div className="layout-form-modal entity-300 entity-small">
        {loaderForm ? (
          <>
            <Spin tip="Cargando" />
          </>
        ) : (
          <>
            <Row gutter={15}>
              <Divider orientation="left">Acerca del Invitado</Divider>

              <Descriptions size="small" column={3} style={{ marginBottom: 20 }}>
                <Descriptions.Item label="Nombres">{selectedGuest?.firstname}</Descriptions.Item>
                <Descriptions.Item label="Apellidos">{selectedGuest?.lastname}</Descriptions.Item>
                <Descriptions.Item label="Tipo Documento">{selectedGuest?.documentType}</Descriptions.Item>
                <Descriptions.Item label="Documento">{selectedGuest?.document}</Descriptions.Item>
                <Descriptions.Item label="Fecha">{selectedGuest?.createAt}</Descriptions.Item>
                <Descriptions.Item label="Direccion">{selectedGuest?.address}</Descriptions.Item>
                <Descriptions.Item label="Ciudad">{selectedGuest?.city}</Descriptions.Item>
                <Descriptions.Item label="Region">{selectedGuest?.region}</Descriptions.Item>
                <Descriptions.Item label="Pais">{selectedGuest?.country}</Descriptions.Item>
                <Descriptions.Item label="Tipo">{selectedGuest?.type}</Descriptions.Item>
                <Descriptions.Item label="Realizada por">{selectedGuest?.rootId?.email}</Descriptions.Item>
              </Descriptions>
            </Row>
          </>
        )}
      </div>
    </BaseModal>
  );
};

ManageGuestModal.defaultProps = {
  setGuestId: () => {},
};

export default ManageGuestModal;
