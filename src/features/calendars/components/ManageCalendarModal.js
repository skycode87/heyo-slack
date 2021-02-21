import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Form, Row, Col, Input, Select, Spin, DatePicker, Switch, Typography, Tabs } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";

import { saveCalendar } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";

const { TabPane } = Tabs;

const moment = require("moment");

const { TextArea } = Input;

const { Title, Link } = Typography;

const { Option } = Select;

const ManageAppModal = ({ getApp, appId, openModal, closeModal, refetch, initialValues, setSelectedAppMain }) => {
  const [selectedApp, setSelectedApp] = useState(initialValues);
  const [form] = Form.useForm();
  const [requestData, setRequestData] = useState({});
  const [loaderForm, setLoaderForm] = useState(false);
  const sessionStoreRedux = useSelector((store) => store.session);

  useEffect(() => {
    if (appId) {
      setLoaderForm(true);
      getApp(appId, {
        onSuccess: (response) => {
          setSelectedApp(response.result);
          setLoaderForm(false);
        },
        onError: () => showGlobalNotification("error", "Error", "error"),
      });
    } else {
      setSelectedApp(initialValues);
    }
  }, [appId]);

  useEffect(() => {
    if (requestData.message) {
      closeModal();
      showGlobalNotification("success", "Exitooo", requestData.message);
      if (!appId) setSelectedApp(initialValues);
      refetch();
    }
  }, [requestData]);

  useEffect(() => {
    form.setFieldsValue(selectedApp);
  }, [form, selectedApp]);

  const handleCloseModal = () => {
    refetch();
    closeModal();
  };

  const onFinish = (values) => {
    const data = { ...selectedApp, ...values };
    saveCalendar(
      {
        ...data,
        appId: appId || "",
        rootId: sessionStoreRedux.currentSession_id,
      },
      {
        onSuccess: (response) => {
          setRequestData(response);
          setSelectedApp(response.result);
          if (appId) {
            setSelectedAppMain(response.result);
          }
          showGlobalNotification("success", "En Horabuena", "Registro Exitoso");
        },
        onError: () => showGlobalNotification("error", "Error", "error"),
        onFinally: () => handleCloseModal(),
      }
    );
  };

  const onValuesChange = (values) => {
    setSelectedApp({ ...selectedApp, ...values });
  };

  const dateFormat = "YYYY/MM/DD";

  const handleSubmit = () => {
    form.validateFields().then(() => {
      form.submit();
    });
  };

  const handleActive = (checked) => {
    setSelectedApp({ ...selectedApp, active: checked });
  };

  const handlePublic = (checked) => {
    setSelectedApp({ ...selectedApp, public: checked });
  };

  return (
    <BaseModal
      isOpenModal={openModal}
      closeModal={handleCloseModal}
      onCancel={handleCloseModal}
      onConfirm={() => handleSubmit()}
      title={appId ? "Editar Calendario" : "Nuevo Calendario"}
      width={700}
      confirmText="Guardar"
      isCloseModal
      top={70}
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
        <div className="layout-form-modal entity-300 entity-small">
          {loaderForm ? (
            <>
              <Spin tip="Cargando" />
            </>
          ) : (
            <>
              <Row>
                <Col>
                  <Tabs defaultActiveKey="1">
                    <TabPane
                      style={{ width: 600 }}
                      tab={
                        <span>
                          <AppleOutlined />
                          General
                        </span>
                      }
                      key="1"
                    >
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item name="observation2" label="Fecha de Inicio">
                            <DatePicker
                              style={{ width: "100%" }}
                              onChange={selectedApp}
                              defaultValue={
                                selectedApp?.startdate
                                  ? moment(selectedApp.closuredate, dateFormat)
                                  : moment(moment(), dateFormat)
                              }
                              format={dateFormat}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="reference1" label="Fecha de Salida">
                            <DatePicker
                              style={{ width: "100%" }}
                              onChange={() => {}}
                              defaultValue={
                                selectedApp?.closuredate
                                  ? moment(selectedApp?.closuredate, dateFormat)
                                  : moment(moment().add(190, "days"), dateFormat)
                              }
                              format={dateFormat}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item name="observation" label="Descripcion">
                            <TextArea showCount="true" onResize="false" value={selectedApp?.observation} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item name="active" labelAlign="right" label="Activo?">
                            <Switch checked={!!selectedApp?.active} onChange={handleActive} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane
                      tab={
                        <span>
                          <AndroidOutlined />
                          Cierre
                        </span>
                      }
                      key="3"
                    >
                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item name="price" label="Precio">
                            <Input value={selectedApp?.price} />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item name="category" label="Categoria">
                            <Select className="select-form-modal">
                              <Option value="PASSPORT">Pasaporte</Option>
                              <Option value="DNI">DNI</Option>
                              <Option value="CEDULA_EXTRANJERIA">Cedula de Extranjeria</Option>
                              <Option value="OTRO">Otro</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item name="duration" label="Duración">
                            <Input value={selectedApp?.duration} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane
                      tab={
                        <span>
                          <AndroidOutlined />
                          Avanzado
                        </span>
                      }
                      key="2"
                    >
                      <Row gutter={16}>
                        <Col span={6}>
                          <Form.Item name="minLimit" label="Minimo">
                            <Input value={selectedApp?.minLimit} />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item name="maxLimit" label="Maximo">
                            <Input value={selectedApp?.maxLimit} />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item name="departurePlace" label="Locación">
                            <Input value={selectedApp?.departurePlace} />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item name="price" label="Precio">
                            <Input value={selectedApp?.price} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item name="category" label="Categoria">
                            <Select className="select-form-modal">
                              <Option value="PASSPORT">Pasaporte</Option>
                              <Option value="DNI">DNI</Option>
                              <Option value="CEDULA_EXTRANJERIA">Cedula de Extranjeria</Option>
                              <Option value="OTRO">Otro</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="public" labelAlign="right" label="Publico?">
                            <Switch checked={!!selectedApp?.public} onChange={handlePublic} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item name="featureImage" label="Imagen Portada">
                            <Input value={selectedApp?.featureImage} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="tag" label="Tags">
                            <Input value={selectedApp?.tag} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </TabPane>
                  </Tabs>
                </Col>
              </Row>
            </>
          )}
        </div>
      </Form>
    </BaseModal>
  );
};

ManageAppModal.defaultProps = {
  setAppId: () => {},
};

export default ManageAppModal;
