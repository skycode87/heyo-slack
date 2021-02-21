import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";

import { Form, Row, Col, Input, Select, Spin, DatePicker, Switch, Typography, Descriptions } from "antd";
import { saveTrans } from "../requests";
import { getApp } from "../../apps/requests";

import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";
import SelectApps from "../../apps/components/SelectApps";

const moment = require("moment");

const { TextArea } = Input;

const { Title, Link } = Typography;

const { Option } = Select;

const ManageTransModal = ({
  getTrans,
  transId,
  openModal,
  closeModal,
  refetch,
  initialValues,
  setSelectedTransMain,
  selectedApp,
  selectedTransMain,
}) => {
  const [selectedTrans, setSelectedTrans] = useState(initialValues);
  const [form] = Form.useForm();
  const [requestData, setRequestData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [loaderForm, setLoaderForm] = useState(false);
  const sessionStoreRedux = useSelector((store) => store.session);

  useEffect(() => {
    if (transId) {
      setLoaderForm(true);
      // eslint-disable-next-line no-unused-expressions
      !selectedApp &&
        getTrans(transId, {
          onSuccess: (response) => {
            setSelectedTrans(response.result);
            setLoaderForm(false);
          },
          onError: () => showGlobalNotification("error", "Error", "error"),
        });
    } else {
      setSelectedTrans(initialValues);
    }
  }, [transId]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
    if (selectedApp && selectedApp?._id) {
      setLoaderForm(true);
      getApp(selectedApp._id, {
        onSuccess: (response) => {
          setSelectedTrans({
            ...selectedTrans,
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
      if (!transId) setSelectedTrans(initialValues);
      refetch();
    }
  }, [requestData]);

  useEffect(() => {
    form.setFieldsValue(selectedTrans);
  }, [form, selectedTrans]);

  useEffect(() => {
    setSelectedTrans(selectedTransMain);
    setIsEdit(true);
  }, [transId]);

  const handleCloseModal = () => {
    refetch();
    closeModal();
  };

  useEffect(() => {
    console.log(selectedApp);
  }, [selectedApp]);

  useEffect(() => {
    console.log(selectedTrans);
  }, [selectedTrans]);

  const onFinish = (values) => {
    const data = { ...selectedTrans, ...values };

    console.log(selectedTrans);

    let planId = null;
    if (selectedTrans.app?.planId) {
      planId = selectedTrans.app.planId?._id;
    } else if (selectedTrans.planId) {
      planId = selectedTrans.app.planId?._id;
    }

    let userId = null;
    if (selectedTrans.app?.userId) {
      userId = selectedTrans.app.userId?._id;
    } else if (selectedTrans.userId) {
      userId = selectedTrans.app.userId?._id;
    }

    saveTrans(
      {
        ...data,
        planId,
        userId,
        appId: selectedTrans.appId,
        transId: transId || "",
        rootId: sessionStoreRedux.currentSession_id,
      },
      {
        onSuccess: (response) => {
          setRequestData(response);
          setSelectedTrans(response.result);
          if (transId) {
            setSelectedTransMain(response.result);
          }
          showGlobalNotification("success", "En Horabuena", "Registro Exitoso");
        },
        onError: () => showGlobalNotification("error", "Error", "error"),
        onFinally: () => handleCloseModal(),
      }
    );
  };

  const onValuesChange = debounce((values) => {
    if (values?.amount) {
      if (parseFloat(values.amount) <= parseFloat(selectedTrans.total)) {
        setSelectedTrans({ ...selectedTrans, ...values, pending: selectedTrans.total - values.amount });
      } else {
        setSelectedTrans({ ...selectedTrans, ...values, amount: selectedTrans.amount });
      }
    } else {
      setSelectedTrans({ ...selectedTrans, ...values });
    }
  }, 500);

  const handleSubmit = () => {
    form.validateFields().then(() => {
      form.submit();
    });
  };

  const handleApp = (appId) => {
    setLoaderForm(true);
    getApp(appId, {
      onSuccess: (response) => {
        setSelectedTrans({
          ...selectedTrans,
          appId,
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
  };

  return (
    <BaseModal
      isOpenModal={openModal}
      closeModal={handleCloseModal}
      onCancel={handleCloseModal}
      onConfirm={() => handleSubmit()}
      title={transId ? "Editar Trans" : "Nuevo Trans"}
      width={1000}
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
              {selectedApp?._id && (
                <Descriptions size="small" column={2} style={{ marginBottom: 20 }}>
                  <Descriptions.Item label="Nombre">{selectedApp.planId?.name}</Descriptions.Item>
                  <Descriptions.Item label="Duración">{selectedApp.planId?.duration}</Descriptions.Item>
                  <Descriptions.Item label="Categoría">{selectedApp.planId?.category}</Descriptions.Item>
                  <Descriptions.Item label="Precio">{selectedApp.planId?.price}</Descriptions.Item>
                </Descriptions>
              )}

              {!selectedApp && !selectedTrans && (
                <Row gutter={15} style={{ paddingBottom: 10 }}>
                  <Col span={24}>
                    <Form.Item name="appId2" tooltip="Firstname here pleaseio" label="Nombre del Paquete">
                      <SelectApps defaultValue={selectedTrans?.appId} returnData={handleApp} />
                    </Form.Item>
                  </Col>
                </Row>
              )}
              {selectedTrans && !selectedApp && (
                <Row gutter={15}>
                  <Descriptions size="small" column={2} style={{ marginBottom: 20 }}>
                    <Descriptions.Item label="Nombre">{selectedTrans.planId?.name}</Descriptions.Item>
                    <Descriptions.Item label="Duración">{selectedTrans.planId?.duration}</Descriptions.Item>
                    <Descriptions.Item label="Categoría">{selectedTrans.planId?.category}</Descriptions.Item>
                    <Descriptions.Item label="Precio">{selectedTrans.planId?.price}</Descriptions.Item>
                  </Descriptions>
                </Row>
              )}
              <Row gutter={15}>
                <Col span={7}>
                  <Form.Item name="mode" label="Modalidad">
                    <Select disabled={!!transId} className="select-form-modal">
                      <Option value="Transferencia">Transferencia</Option>
                      <Option value="efectivo">Efectivo</Option>
                      <Option value="Debito">Debito</Option>
                      <Option value="Credito">Credito</Option>
                      <Option value="Otro">Otro</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="reference" label="Referencía">
                    <Input disabled={!!transId} value={selectedTrans?.reference} />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item name="description" label="Descripción">
                    <Input value={selectedTrans?.description} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="fullname" label="Nombre Completo">
                    <Input disabled={!!transId} value={selectedTrans?.fullname} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="email" label="Email">
                    <Input disabled={!!transId} value={selectedTrans?.email} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="phone" label="Teléfono">
                    <Input disabled={!!transId} value={selectedTrans?.phone} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} style={{ backgroundColor: "#FFE79F", paddingTop: 10, marginTop: 10, borderRadius: 5 }}>
                <Col span={8}>
                  <Form.Item disabled={!!transId} label="Monto a pagar" name="amount">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Queda debiendo" name="pending">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Total a Pagar" name="total">
                    <Input disabled />
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

ManageTransModal.defaultProps = {
  setTransId: () => {},
};

export default ManageTransModal;
