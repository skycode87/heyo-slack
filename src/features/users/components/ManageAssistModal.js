import { useState, useEffect } from "react";
import { Form, Row, Col, Input, Select, Spin, DatePicker, Divider, Switch, Space, Typography } from "antd";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";

const moment = require("moment");

const { Title, Link } = Typography;

const { Option } = Select;

const ManageAssistModal = ({ saveAssist, getUser, userId, openModal, closeModal, refetch, initialValues }) => {
  const [selectedUser, setSelectedUser] = useState(initialValues);
  const [form] = Form.useForm();
  const [requestData, setRequestData] = useState({});
  const [loaderForm, setLoaderForm] = useState(false);

  useEffect(() => {
    if (requestData.message) {
      closeModal();
      showGlobalNotification("success", "Exitooo", requestData.message);
      if (!userId) setSelectedUser(initialValues);
      refetch();
    }
  }, [requestData]);

  useEffect(() => {
    form.setFieldsValue(selectedUser);
  }, [form, selectedUser]);

  const handleCloseModal = () => {
    refetch();
    closeModal();
  };

  const onFinish = (values) => {
    const data = { ...selectedUser, ...values };
    saveAssist(
      {
        ...data,
        userId: userId || "",
      },
      {
        onSuccess: (response) => {
          setRequestData(response);
          setSelectedUser(response.usuario);
          showGlobalNotification("success", "En Horabuena", "Registro Exitoso");
        },
        onError: () => showGlobalNotification("error", "Error", "error"),
        onFinally: () => handleCloseModal(),
      }
    );
  };

  const onValuesChange = (values) => {
    setSelectedUser({ ...selectedUser, ...values });
  };

  const handleSubmit = () => {
    form.validateFields().then(() => {
      form.submit();
    });
  };

  return (
    <BaseModal
      isOpenModal={openModal}
      closeModal={handleCloseModal}
      onCancel={handleCloseModal}
      onConfirm={() => handleSubmit()}
      title="Registrar Asistencia"
      width={600}
      confirmText="guardar"
      isCloseModal
      top={50}
    >
      <Form
        form={form}
        name="manage-category-form-modal"
        initialValues={initialValues}
        className="manage-modal"
        onFinish={onFinish}
        labelCol={{ span: 24 }}
        onValuesChange={onValuesChange}
      >
        <div className="layout-form-modal entity-assist">
          {loaderForm ? (
            <>
              <Spin tip="Cargando" />
            </>
          ) : (
            <>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="type" label="Motivo">
                    <Select style={{ width: "100%" }} className="select-form-modal">
                      <Option value="suscripcion">suscripcion</Option>
                      <Option value="manager">manager</Option>
                      <Option value="servicio">servicio</Option>
                      <Option value="evento">evento</Option>
                      <Option value="otro">otro</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="location" label="Locación">
                    <Select style={{ width: "100%" }} className="select-form-modal">
                      <Option value="envigado">envigado</Option>
                      <Option value="medellin">medellin</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item name="observation" label="Informacion extra">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
        </div>
      </Form>
    </BaseModal>
  );
};

/*
ManageAssistModal.defaultProps = {
  setUserId: () => {},
};
*/

export default ManageAssistModal;
