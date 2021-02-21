import { useState, useEffect } from "react";
import { Form, Row, Col, Input, Select, Spin, DatePicker, Switch, Typography } from "antd";
import { saveGuest } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";

const moment = require("moment");

const { Title } = Typography;

const { Option } = Select;

const ManageGuestModal = ({ getGuest, guestId, openModal, closeModal, initialValues, setSelectedGuestMain }) => {
  const [selectedGuest, setSelectedGuest] = useState(initialValues);
  const [form] = Form.useForm();
  const [requestData, setRequestData] = useState({});
  const [loaderForm, setLoaderForm] = useState(false);

  useEffect(() => {
    if (guestId) {
      setLoaderForm(true);
      getGuest(guestId, {
        onSuccess: (response) => {
          setSelectedGuest(response.guest);
          setLoaderForm(false);
        },
        onError: () => showGlobalNotification("error", "Error", "error"),
      });
    }
  }, [guestId]);

  useEffect(() => {
    if (requestData.message) {
      closeModal();
      showGlobalNotification("success", "Exitooo", requestData.message);
      if (!guestId) setSelectedGuest(initialValues);
    }
  }, [requestData]);

  useEffect(() => {
    form.setFieldsValue(selectedGuest);
  }, [form, selectedGuest]);

  const handleCloseModal = () => {
    closeModal();
  };

  const onFinish = (values) => {
    const data = { ...selectedGuest, ...values };
    saveGuest(
      {
        ...data,
        guestId: guestId || "",
      },
      {
        onSuccess: (response) => {
          setRequestData(response);
          setSelectedGuest(response.usuario);
          if (guestId) {
            setSelectedGuestMain(response.usuario);
          }
          showGlobalNotification("success", "En Horabuena", "Registro Exitoso");
        },
        onError: () => showGlobalNotification("error", "Error", "error"),
        onFinally: () => handleCloseModal(),
      }
    );
  };

  const onValuesChange = (values) => {
    setSelectedGuest({ ...selectedGuest, ...values });
  };

  const dateFormat = "YYYY/MM/DD";

  const handleSubmit = () => {
    form.validateFields().then(() => {
      form.submit();
    });
  };

  const handleBirthdate = (date, dateString) => {
    setSelectedGuest({ ...selectedGuest, birthdate: dateString });
  };

  const handleClosureDate = (date, dateString) => {
    setSelectedGuest({ ...selectedGuest, closuredate: dateString });
  };

  const handleStartDate = (date, dateString) => {
    setSelectedGuest({ ...selectedGuest, startdate: dateString });
  };

  const handleActive = (checked) => {
    setSelectedGuest({ ...selectedGuest, active: checked });
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
        <div className="layout-form-modal entity-guest">
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
                    <Input placeholder="" value={selectedGuest.firstname} />
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
                    <Input value={selectedGuest.lastname} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: `Por favor ingrese el email` }]}
                  >
                    <Input disabled="true" value={selectedGuest.email} />
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
                    <Input value={selectedGuest.phone} />
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
                    <Input disabled="true" value={selectedGuest.document} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="birthdate02" label="Nacimiento">
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={handleBirthdate}
                      defaultValue={moment(selectedGuest.birthdate, dateFormat)}
                      format={dateFormat}
                    />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item name="country" label="Pais">
                    <Input value={selectedGuest.country} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={16}>
                  <Form.Item name="address" label="Direccion">
                    <Input value={selectedGuest.address} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="city" label="Ciudad">
                    <Input value={selectedGuest.city} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="region" label="Region">
                    <Input value={selectedGuest.region} />
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
                        selectedGuest.startdate
                          ? moment(selectedGuest.closuredate, dateFormat)
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
                        selectedGuest.closuredate
                          ? moment(selectedGuest.closuredate, dateFormat)
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

ManageGuestModal.defaultProps = {
  setGuestId: () => {},
};

export default ManageGuestModal;
