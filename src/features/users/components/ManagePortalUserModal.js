import { useState, useEffect } from "react";
import { Form, Row, Col, Input, Select, Spin, DatePicker, Switch, Typography } from "antd";
import { saveUser } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";

const moment = require("moment");

const { Title } = Typography;

const { Option } = Select;

const ManageUserModal = ({ getUser, userId, openModal, closeModal, initialValues, setSelectedUserMain }) => {
  const [selectedUser, setSelectedUser] = useState(initialValues);
  const [form] = Form.useForm();
  const [requestData, setRequestData] = useState({});
  const [loaderForm, setLoaderForm] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoaderForm(true);
      getUser(userId, {
        onSuccess: (response) => {
          setSelectedUser(response.user);
          setLoaderForm(false);
        },
        onError: () => showGlobalNotification("error", "Error", "error"),
      });
    }
  }, [userId]);

  useEffect(() => {
    if (requestData.message) {
      closeModal();
      showGlobalNotification("success", "Exitooo", requestData.message);
      if (!userId) setSelectedUser(initialValues);
    }
  }, [requestData]);

  useEffect(() => {
    form.setFieldsValue(selectedUser);
  }, [form, selectedUser]);

  const handleCloseModal = () => {
    closeModal();
  };

  const onFinish = (values) => {
    const data = { ...selectedUser, ...values };
    saveUser(
      {
        ...data,
        userId: userId || "",
      },
      {
        onSuccess: (response) => {
          setRequestData(response);
          setSelectedUser(response.usuario);
          if (userId) {
            setSelectedUserMain(response.usuario);
          }
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

  const dateFormat = "YYYY/MM/DD";

  const handleSubmit = () => {
    form.validateFields().then(() => {
      form.submit();
    });
  };

  const handleBirthdate = (date, dateString) => {
    setSelectedUser({ ...selectedUser, birthdate: dateString });
  };

  const handleClosureDate = (date, dateString) => {
    setSelectedUser({ ...selectedUser, closuredate: dateString });
  };

  const handleStartDate = (date, dateString) => {
    setSelectedUser({ ...selectedUser, startdate: dateString });
  };

  const handleActive = (checked) => {
    setSelectedUser({ ...selectedUser, active: checked });
  };

  return (
    <BaseModal
      isOpenModal={openModal}
      closeModal={handleCloseModal}
      onCancel={handleCloseModal}
      onConfirm={() => handleSubmit()}
      title="Editar Información"
      width={1000}
      confirmText="Guardar"
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
        <div className="layout-form-modal entity-user">
          {loaderForm ? (
            <>
              <Spin tip="Cargando" />
            </>
          ) : (
            <>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    name="firstname"
                    tooltip="Firstname here pleaseio"
                    label="Nombre"
                    rules={[
                      {
                        required: true,
                        message: `Por favor ingrese el nombre`,
                      },
                    ]}
                  >
                    <Input placeholder="" value={selectedUser.firstname} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="lastname"
                    label="Apellidos"
                    rules={[
                      {
                        required: true,
                        message: `Por favor ingrese el apellido`,
                      },
                    ]}
                  >
                    <Input value={selectedUser.lastname} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: `Por favor ingrese el email` }]}
                  >
                    <Input disabled="true" value={selectedUser.email} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="phone"
                    label="Numero telefonico"
                    rules={[
                      {
                        required: true,
                        message: `Por favor ingrese el numero telefonico`,
                      },
                    ]}
                  >
                    <Input value={selectedUser.phone} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={5}>
                  <Form.Item name="documentType" label="Tipo de Documento">
                    <Select disabled="true" className="select-form-modal">
                      <Option value="PASSPORT">Pasaporte</Option>
                      <Option value="DNI">DNI</Option>
                      <Option value="CEDULA_EXTRANJERIA">Cedula de Extranjeria</Option>
                      <Option value="OTRO">Otro</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="document" label="Numero de Documento">
                    <Input disabled="true" value={selectedUser.document} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="birthdate02" label="Nacimiento">
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={handleBirthdate}
                      defaultValue={moment(selectedUser.birthdate, dateFormat)}
                      format={dateFormat}
                    />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item name="country" label="Pais">
                    <Input value={selectedUser.country} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={16}>
                  <Form.Item name="address" label="Direccion">
                    <Input value={selectedUser.address} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="city" label="Ciudad">
                    <Input value={selectedUser.city} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="region" label="Region">
                    <Input value={selectedUser.region} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={0} style={{ paddingTop: 15, paddingBottom: 5 }}>
                <Title level={5}> Acerca del Gimnasio</Title>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item name="observation2" label="Fecha de Inicio">
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={handleStartDate}
                      disabled="true"
                      defaultValue={
                        selectedUser.startdate
                          ? moment(selectedUser.closuredate, dateFormat)
                          : moment(moment(), dateFormat)
                      }
                      format={dateFormat}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="reference1" label="Fecha de Salida">
                    <DatePicker
                      disabled="true"
                      style={{ width: "100%" }}
                      onChange={handleClosureDate}
                      defaultValue={
                        selectedUser.closuredate
                          ? moment(selectedUser.closuredate, dateFormat)
                          : moment(moment().add(190, "days"), dateFormat)
                      }
                      format={dateFormat}
                    />
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

ManageUserModal.defaultProps = {
  setUserId: () => {},
};

export default ManageUserModal;
