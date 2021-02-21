import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Form, Row, Col, Input, Select, Spin, DatePicker, Switch, Typography, Descriptions, InputNumber } from "antd";
import { savePlan } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";
import SelectPacks from "../../packs/components/SelectPacks";

const moment = require("moment");

const { TextArea } = Input;
const { Option } = Select;

const initials = {
  name: "",
  departurePlace: "",
  minLimit: 1,
  maxLimit: 1,
  price: 0,
};

const ManagePlanModal = ({
  getPlan,
  planId,
  openModal,
  closeModal,
  refetch,
  initialValues,
  selectedPack,
  calendar,
  setCalendar,
  t,
  setNewPlan,
  newPlan,
  setPlanId,
}) => {
  const [selectedPlan, setSelectedPlan] = useState(initialValues);
  const [form] = Form.useForm();
  const [requestData, setRequestData] = useState({});
  const [loaderForm, setLoaderForm] = useState(false);
  const sessionStoreRedux = useSelector((store) => store.session);
  const { currentPack: PackRedux } = useSelector((store) => store.pack);

  useEffect(() => {
    if (planId) {
      console.log(" Se Quiere editar");
      setLoaderForm(true);
      // eslint-disable-next-line no-unused-expressions
      !selectedPack &&
        getPlan(planId, {
          onSuccess: (response) => {
            // setSelectedPlan();
            setSelectedPlan({
              ...response.result,
              startdate: moment(response.result.startdate, "YYYY/MM/DD HH:mm") || moment("2020/12/12", "YYYY/MM/DD"),
              closuredate:
                moment(response.result.closuredate, "YYYY/MM/DD HH:mm") || moment("2020/12/12", "YYYY/MM/DD"),
            });
            setLoaderForm(false);
          },
          onError: () => showGlobalNotification("error", "Error", "error"),
        });
    } else {
      setSelectedPlan(initialValues);
    }
  }, [planId]);

  useEffect(() => {
    if (calendar?.start) {
      console.log(" Se selecciono desde el calendario");
      setSelectedPlan({
        ...selectedPlan,
        startdate: moment(calendar?.start, "YYYY/MM/DD HH:mm") || moment("2020/12/12", "YYYY/MM/DD"),
        closuredate: moment(calendar?.end, "YYYY/MM/DD HH:mm") || moment("2020/12/12", "YYYY/MM/DD"),
      });
    }

    if (newPlan) {
      console.log(" Se selecciono desde arriba");
      setSelectedPlan({
        ...selectedPlan,
        startdate: moment(moment().format("YYYY-MM-DD"), "YYYY/MM/DD HH:mm"),
        closuredate: moment(moment().format("YYYY-MM-DD"), "YYYY/MM/DD HH:mm"),
      });
      setNewPlan(false);
    }
  }, [openModal]);

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
    setSelectedPlan({
      ...selectedPlan,
      ...initials,
    });
    setPlanId("");
    setCalendar({});
    refetch();
    closeModal();
  };

  const onFinish = (values) => {
    const data = { ...selectedPlan, ...values };
    savePlan(
      {
        ...data,
        packId: PackRedux ? PackRedux._id : selectedPlan.packId,
        planId: planId && planId.length > 1 ? planId : "",
        rootId: sessionStoreRedux.currentSession_id,
      },
      {
        onSuccess: (response) => {
          setRequestData(response);
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

  const handlePack = (value) => {
    setSelectedPlan({ ...selectedPlan, packId: value });
  };

  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
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
        <div className="layout-form-modal entity-550 entity-small">
          {loaderForm ? (
            <>
              <Spin tip={t("loading")} />
            </>
          ) : (
            <>
              {PackRedux?._id && (
                <Descriptions size="small" column={2} style={{ marginBottom: 20 }}>
                  <Descriptions.Item label={t("name")}>{PackRedux.name}</Descriptions.Item>
                  <Descriptions.Item label={t("duration")}>{PackRedux.duration}</Descriptions.Item>
                  <Descriptions.Item label={t("category")}>{PackRedux.category}</Descriptions.Item>
                  <Descriptions.Item label={t("price")}>{PackRedux.price}</Descriptions.Item>
                  <Descriptions.Item label={t("minimum")}>{PackRedux.minLimit}</Descriptions.Item>
                  <Descriptions.Item label={t("maximum")}>{PackRedux.maxLimit}</Descriptions.Item>
                </Descriptions>
              )}

              {!PackRedux?._id && (
                <Row gutter={15} style={{ paddingBottom: 10 }}>
                  <Col span={24}>
                    <Form.Item name="packId2" tooltip="Firstname here pleaseio" label={t("pack")}>
                      <SelectPacks defaultValue={selectedPlan?.packId} returnData={handlePack} />
                    </Form.Item>
                  </Col>
                </Row>
              )}
              <Row gutter={15}>
                <Col span={10}>
                  <Form.Item
                    name="name"
                    tooltip="Firstname here pleaseio"
                    label={t("plan")}
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
                  <Form.Item name="category" label={t("category")}>
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
                    label={t("duration")}
                    rules={[{ required: true, message: `Por favor ingrese el email` }]}
                  >
                    <Input value={selectedPlan?.duration} />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="active" labelAlign="right" label={t("active")}>
                    <Switch checked={!!selectedPlan?.active} onChange={handleActive} />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="public" labelAlign="right" label={t("public")}>
                    <Switch checked={!!selectedPlan?.public} onChange={handlePublic} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item name="minLimit" label={t("minimum")}>
                    <InputNumber min={1} max={20} defaultValue={1} value={selectedPlan?.minLimit} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="maxLimit" label={t("maximum")}>
                    <InputNumber min={1} max={20} defaultValue={1} value={selectedPlan?.maxLimit} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="departurePlace" label={t("location")}>
                    <Input value={selectedPlan?.departurePlace} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="price" label={t("price")}>
                    <InputNumber
                      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      value={selectedPlan?.price}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item name="startdate" label={t("startdate")} {...config}>
                    <DatePicker showTime format="YYYY/MM/DD HH" use12Hours="true" />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item name="closuredate" label={t("enddate")} {...config}>
                    <DatePicker showTime format="YYYY/MM/DD HH" use12Hours="true" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="featureImage" label={t("featureImage")}>
                    <Input value={selectedPlan?.featureImage} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="tag" label={t("tags")}>
                    <Input value={selectedPlan?.tag} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="observation" label={t("description")}>
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
