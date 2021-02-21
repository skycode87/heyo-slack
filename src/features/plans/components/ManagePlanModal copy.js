import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Form, Row, Col, Input, Select, Spin, DatePicker, Switch, Typography } from "antd";
import { savePlan } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";

const moment = require("moment");

const { TextArea } = Input;

const { Title, Link } = Typography;

const { Option } = Select;

const ManagePlanModal = ({ getPlan, planId, openModal, closeModal, refetch, initialValues, setSelectedPlanMain }) => {
  const [selectedPlan, setSelectedPlan] = useState(initialValues);
  const [form] = Form.useForm();
  const [requestData, setRequestData] = useState({});
  const [loaderForm, setLoaderForm] = useState(false);
  const sessionStoreRedux = useSelector((store) => store.session);

  useEffect(() => {
    if (planId) {
      setLoaderForm(true);
      getPlan(planId, {
        onSuccess: (response) => {
          setSelectedPlan(response.result);
          setLoaderForm(false);
        },
        onError: () => showGlobalNotification("error", "Error", "error"),
      });
    } else {
      setSelectedPlan(initialValues);
    }
  }, [planId]);

  useEffect(() => {
    if (requestData.message) {
      closeModal();
      showGlobalNotification("success", "Exitooo", requestData.message);
      if (!planId) setSelectedPlan(initialValues);
      refetch();
    }
  }, [requestData]);

  useEffect(() => {
    form.setFieldsValue(selectedPlan);
  }, [form, selectedPlan]);

  const handleCloseModal = () => {
    refetch();
    closeModal();
  };

  const onFinish = (values) => {
    const data = { ...selectedPlan, ...values };
    savePlan(
      {
        ...data,
        planId: planId || "",
        rootId: sessionStoreRedux.currentSession_id,
      },
      {
        onSuccess: (response) => {
          setRequestData(response);
          setSelectedPlan(response.result);
          if (planId) {
            setSelectedPlanMain(response.result);
          }
          showGlobalNotification("success", "En Horabuena", "Registro Exitoso");
        },
        onError: () => showGlobalNotification("error", "Error", "error"),
        onFinally: () => handleCloseModal(),
      }
    );
  };

  const onValuesChange = (values) => {
    setSelectedPlan({ ...selectedPlan, ...values });
  };

  const dateFormat = "YYYY/MM/DD";

  const handleSubmit = () => {
    form.validateFields().then(() => {
      form.submit();
    });
  };

  const handleActive = (checked) => {
    setSelectedPlan({ ...selectedPlan, active: checked });
  };

  const handlePublic = (checked) => {
    setSelectedPlan({ ...selectedPlan, public: checked });
  };

  return (
    <BaseModal
      isOpenModal={openModal}
      closeModal={handleCloseModal}
      onCancel={handleCloseModal}
      onConfirm={() => handleSubmit()}
      title={planId ? "Editar Plan" : "Nuevo Plan"}
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
        <div className="layout-form-modal entity-plan">
          {loaderForm ? (
            <>
              <Spin tip="Cargando" />
            </>
          ) : (
            <>
              <Row gutter={15}>
                <Col span={10}>
                  <Form.Item
                    name="name"
                    tooltip="Firstname here pleaseio"
                    label="Nombre del Paquete"
                    rules={[
                      {
                        required: true,
                        message: `Por favor ingrese el nombre`,
                      },
                    ]}
                  >
                    <Input placeholder="" value={selectedPlan?.name} />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item name="category" label="Categoria">
                    <Select className="select-form-modal">
                      <Option value="PASSPORT">Pasaporte</Option>
                      <Option value="DNI">DNI</Option>
                      <Option value="CEDULA_EXTRANJERIA">Cedula de Extranjeria</Option>
                      <Option value="OTRO">Otro</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item
                    name="duration"
                    label="Duración"
                    rules={[{ required: true, message: `Por favor ingrese el email` }]}
                  >
                    <Input value={selectedPlan?.duration} />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="active" labelAlign="right" label="Activo?">
                    <Switch checked={!!selectedPlan?.active} onChange={handleActive} />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="public" labelAlign="right" label="Publico?">
                    <Switch checked={!!selectedPlan?.public} onChange={handlePublic} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={2}>
                  <Form.Item name="minLimit" label="Minimo">
                    <Input value={selectedPlan?.minLimit} />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Form.Item name="maxLimit" label="Maximo">
                    <Input value={selectedPlan?.maxLimit} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="departurePlace" label="Locación">
                    <Input value={selectedPlan?.departurePlace} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="price" label="Precio">
                    <Input value={selectedPlan?.price} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="observation2" label="Fecha de Inicio">
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={selectedPlan}
                      defaultValue={
                        selectedPlan?.startdate
                          ? moment(selectedPlan.closuredate, dateFormat)
                          : moment(moment(), dateFormat)
                      }
                      format={dateFormat}
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="reference1" label="Fecha de Salida">
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={() => {}}
                      defaultValue={
                        selectedPlan?.closuredate
                          ? moment(selectedPlan?.closuredate, dateFormat)
                          : moment(moment().add(190, "days"), dateFormat)
                      }
                      format={dateFormat}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="featureImage" label="Imagen Portada">
                    <Input value={selectedPlan?.featureImage} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="tag" label="Tags">
                    <Input value={selectedPlan?.tag} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="observation" label="Descripcion">
                    <TextArea showCount="true" onResize="false" value={selectedPlan?.observation} />
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

ManagePlanModal.defaultProps = {
  setPlanId: () => {},
};

export default ManagePlanModal;
