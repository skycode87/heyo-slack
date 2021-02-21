import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash/debounce";

import { Form, Row, Col, Input, Select, Spin, DatePicker, Switch, InputNumber, message } from "antd";
import { savePlan, getPlan } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";
import SelectPacks from "../../packs/components/SelectPacks";
import { setPlanRedux } from "../../../redux/plan";

const moment = require("moment");

const { TextArea } = Input;
const { Option } = Select;

const defaultValues = {
  name: "Pedro Rojas",
  departurePlace: "Los Patios",
  minLimit: 1,
  maxLimit: 1,
  category: "",
  duration: "12 horas",
  active: true,
  public: false,
  price: 0,
  packId: null,
  startdate: moment(moment().format("YYYY-MM-DD"), "YYYY/MM/DD"),
  closuredate: moment(moment().format("YYYY-MM-DD"), "YYYY/MM/DD"),
};

const ManagePlanModal = ({ planId, openModal, closeModal, refetch, t, setPlanId }) => {
  const dispatch = useDispatch();
  const sessionStoreRedux = useSelector((store) => store.session);

  const [selectedPlan, setSelectedPlan] = useState(defaultValues);
  const [form] = Form.useForm();
  const [loaderForm, setLoaderForm] = useState(false);
  const [mode, setMode] = useState(null);
  const [reload, setReload] = useState(0);

  const handleReset = () => {
    setSelectedPlan(defaultValues);
    setReload(Math.floor(Math.random() * 100000));
  };

  useEffect(() => {
    if (openModal) {
      if (planId) {
        setMode("edit");
      } else {
        setMode("new");
      }
    } else {
      handleReset();
      setMode(null);
      setPlanId(null);
    }
  }, [openModal]);

  useEffect(() => {
    if (mode === "new") {
      handleReset();
    }
  }, [mode]);

  useEffect(() => {
    if (mode === "edit") {
      setLoaderForm(true);
      getPlan(planId, {
        onSuccess: (response) => {
          setPlanRedux(response.result)(dispatch);
          setSelectedPlan({
            ...response.result,
            startdate: moment(response.result.startdate, "YYYY/MM/DD") || moment("2020/12/12", "YYYY/MM/DD"),
            closuredate: moment(response.result.closuredate, "YYYY/MM/DD") || moment("2020/12/12", "YYYY/MM/DD"),
          });
          setLoaderForm(false);
        },
        onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
      });
    }
  }, [mode]);

  useEffect(() => {
    form.setFieldsValue(selectedPlan);
  }, [form, selectedPlan]);

  const handleCloseModal = () => {
    refetch();
    closeModal();
  };

  const onFinish = (values) => {
    const data = { ...selectedPlan, ...values };
    console.log(data.packId);
    if (!data.packId) {
      message.error("This is an error message");
    } else {
      savePlan(
        {
          ...data,
          planId,
          rootId: sessionStoreRedux.currentSession_id,
        },
        {
          onSuccess: (response) => {
            setPlanRedux(response.result)(dispatch);
            showGlobalNotification("success", t("inHorabuena"), t("successfulProcess"));
          },
          onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
          onFinally: () => handleCloseModal(),
        }
      );
    }
  };

  const onValuesChange = debounce((values) => {
    setSelectedPlan({ ...selectedPlan, ...values });
  }, 500);

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
        initialValues={defaultValues}
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
              <Row gutter={15} style={{ paddingBottom: 10 }}>
                <Col span={24}>
                  <Form.Item name="packId2" tooltip="Firstname here pleaseio" label={t("pack")}>
                    <SelectPacks
                      reload={reload}
                      currentValue={selectedPlan?.packId}
                      defaultValue={selectedPlan?.packId}
                      returnData={handlePack}
                    />
                  </Form.Item>
                </Col>
              </Row>

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
