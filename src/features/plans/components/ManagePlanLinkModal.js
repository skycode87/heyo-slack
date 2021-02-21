import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";

import debounce from "lodash/debounce";

import { Form, Row, Col, Input, Select, Spin, DatePicker, Switch, Tabs, message, Divider } from "antd";
import { constantsPlan } from "../constants";

import { savePlan, getPlan } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";
import SelectPacks from "../../packs/components/SelectPacks";
import { setPlanRedux } from "../../../redux/plan";

import "react-quill/dist/quill.snow.css"; // ES6

const moment = require("moment");

const { TabPane } = Tabs;

const { TextArea } = Input;
const { Option } = Select;

const defaultValues = {
  name: "",
  departurePlace: "",
  category: "",
  active: true,
  public: true,
  body: "",
  bodyResponsive: "",
  price: 0,
  packId: null,
  startdate: moment(moment().format("YYYY-MM-DD"), "YYYY/MM/DD HH:mm"),
  closuredate: moment(moment().format("YYYY-MM-DD"), "YYYY/MM/DD HH:mm"),
};

const ManagePlanLinkModal = ({
  planId,
  openModal,
  closeModal,
  refetch,
  setPlanId,
  packData = {},
  typePlan = constantsPlan.CONTENT_TYPE.TEXT,
}) => {
  const dispatch = useDispatch();
  const sessionStoreRedux = useSelector((store) => store.session);
  const { t } = useTranslation();

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
            startdate: moment(response.result.startdate, "YYYY/MM/DD HH:mm") || moment("2020/12/12", "YYYY/MM/DD"),
            closuredate: moment(response.result.closuredate, "YYYY/MM/DD HH:mm") || moment("2020/12/12", "YYYY/MM/DD"),
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
    if (packData?._id) {
      setSelectedPlan({ ...selectedPlan, packId: packData._id });
    }

    const data = { ...selectedPlan, ...values, packId: packData?._id && packData._id };

    if (!data.packId) {
      message.error("This is an error message");
    } else {
      savePlan(
        {
          ...data,
          planId,
          multiple: packData.multiple,
          type: typePlan,
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

  const callback = (key) => console.log(key);

  return (
    <BaseModal
      isOpenModal={openModal}
      closeModal={handleCloseModal}
      onCancel={handleCloseModal}
      onConfirm={() => handleSubmit()}
      title={planId ? `${t("new")} ${t("link")}` : `${t("edit")} ${t("link")}`}
      width={1100}
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
        <div className="layout-form-modal entity-500 entity-small">
          {loaderForm ? (
            <>
              <Spin tip={t("loading")} />
            </>
          ) : (
            <>
              <Row gutter={15} style={{ paddingBottom: 10 }}>
                <Col span={24}>
                  {!packData._id && (
                    <Form.Item name="packId2" tooltip="Firstname here pleaseio" label={t("pack")}>
                      <SelectPacks
                        reload={reload}
                        currentValue={selectedPlan?.packId}
                        defaultValue={selectedPlan?.packId}
                        returnData={handlePack}
                        staticComponent
                      />
                    </Form.Item>
                  )}
                  {packData._id && <h2>{packData.name}</h2>}
                </Col>
              </Row>

              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="General" key="1">
                  <Row gutter={15} className="checked-box ">
                    <Col span={7}>
                      <Form.Item name="category" label={t("category")}>
                        <Select className="select-form-modal">
                          <Option value="PASSPORT">PASSPORT</Option>
                          <Option value="DNI">DNI</Option>
                          <Option value="CEDULA_EXTRANJERIA">CEDULA_EXTRANJERIA</Option>
                          <Option value="OTRO">OTRO</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item name="active" labelAlign="right" label={t("active")}>
                        <Switch checked={!!selectedPlan?.active} onChange={handleActive} />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item name="public" labelAlign="right" label={t("public")}>
                        <Switch checked={!!selectedPlan?.public} onChange={handlePublic} />
                      </Form.Item>
                    </Col>
                  </Row>

                  {typePlan === constantsPlan.CONTENT_TYPE.LINK && (
                    <div>
                      <Divider orientation="left" plain>
                        {t("link")}
                      </Divider>
                      <Row gutter={15}>
                        <Col span={24}>
                          <Form.Item
                            name="name"
                            tooltip="Texto del Enlace"
                            label={t("Text")}
                            rules={[
                              {
                                required: true,
                                message: `Por favor ingrese el texto del Enlace`,
                              },
                            ]}
                          >
                            <Input placeholder="" value={selectedPlan?.name} />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            name="url"
                            tooltip="Url del Enlace"
                            label={t("url")}
                            rules={[
                              {
                                required: true,
                                message: `Por favor ingrese la url del Enlace`,
                              },
                            ]}
                          >
                            <Input placeholder="http://" value={selectedPlan?.url} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  )}

                  {typePlan === constantsPlan.CONTENT_TYPE.HTML && (
                    <div>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item name="body" label={t("body")} className="ql-editor-wrapper-100">
                            <ReactQuill id="receipt" theme="snow" value={selectedPlan?.body} />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            name="bodyResponsive"
                            label={t("bodyResponsive")}
                            className="ql-editor-wrapper-100"
                          >
                            <ReactQuill id="receipt" theme="snow" value={selectedPlan?.bodyResponsive} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  )}

                  {typePlan === constantsPlan.CONTENT_TYPE.TEXT && (
                    <div>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item name="body" label={t("body")}>
                            <TextArea showCount maxLength={100} value={selectedPlan?.body} />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item name="bodyResponsive" label={t("bodyResponsive")}>
                            <TextArea showCount maxLength={100} value={selectedPlan?.bodyResponsive} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  )}

                  {typePlan === constantsPlan.CONTENT_TYPE.IMAGE && (
                    <div>
                      <Row gutter={15}>
                        <Col span={24}>
                          <Form.Item
                            name="name"
                            tooltip="Texto referencia de la imagen"
                            label={t("Text")}
                            rules={[
                              {
                                required: true,
                                message: `Por favor ingrese el texto para la imagen`,
                              },
                            ]}
                          >
                            <Input placeholder="" value={selectedPlan?.name} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  )}
                </TabPane>
                <TabPane tab="Avanzado" key="2">
                  <div style={{ marginTop: 20 }}>
                    <Row gutter={15}>
                      <Col span={4}>
                        <Form.Item name="departurePlace" label={t("location")}>
                          <Input value={selectedPlan?.departurePlace} />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item name="startdate" label={t("startdate")} {...config}>
                          <DatePicker format="YYYY/MM/DD" />
                        </Form.Item>
                      </Col>

                      <Col span={4}>
                        <Form.Item name="closuredate" label={t("enddate")} {...config}>
                          <DatePicker format="YYYY/MM/DD" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
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
                  </div>
                </TabPane>
              </Tabs>
            </>
          )}
        </div>
      </Form>
    </BaseModal>
  );
};

ManagePlanLinkModal.defaultProps = {
  setPlanId: () => {},
};

export default ManagePlanLinkModal;
