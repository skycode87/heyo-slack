import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, InputNumber, Input, Select, Spin, DatePicker, Switch, Tabs, message } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";

import { saveApp, getApp } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";
import { setAppRedux } from "../../../redux/app";
import SelectPlans from "../../plans/components/SelectPlans";
import SelectUsers from "../../users/components/SelectUsers";

import { constantsApp } from "../constants";

const { TabPane } = Tabs;

const moment = require("moment");

const { TextArea } = Input;

const { Option } = Select;

const configDatePicker = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};

const defaultValues = {
  planId: null,
  userId: null,
  observation: "",
  active: true,
  price: 0,
  tag: "",
  avatar: "",
  public: false,
  startdate: moment(moment().format("YYYY-MM-DD"), "YYYY/MM/DD"),
  closuredate: moment(moment().format("YYYY-MM-DD"), "YYYY/MM/DD"),
};

const ManageAppModal = ({ appId, setAppId, openModal, closeModal, refetch, t }) => {
  const dispatch = useDispatch();
  const sessionStoreRedux = useSelector((store) => store.session);

  const [selectedApp, setSelectedApp] = useState(defaultValues);
  const [form] = Form.useForm();
  const [loaderForm, setLoaderForm] = useState(false);
  const [mode, setMode] = useState(null);
  const [reload, setReload] = useState(0);

  const handleReset = () => {
    setSelectedApp(defaultValues);
    setReload(Math.floor(Math.random() * 100000));
  };

  useEffect(() => {
    if (openModal) {
      if (appId) {
        setMode("edit");
      } else {
        setMode("new");
      }
    } else {
      handleReset();
      setMode(null);
      setAppId(null);
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
      getApp(appId, {
        onSuccess: (response) => {
          setAppRedux(response.result)(dispatch);
          setSelectedApp({
            planId: response.result.planId._id,
            userId: response.result.userId._id,
          });

          setLoaderForm(false);
        },
        onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
      });
    }
  }, [mode]);

  useEffect(() => {
    form.setFieldsValue(selectedApp);
  }, [form, selectedApp]);

  const handleCloseModal = () => {
    refetch();
    closeModal();
  };

  const onFinish = (values) => {
    const data = { ...selectedApp, ...values };

    if (!data.planId) {
      message.error("Seleccione un Plan");
    } else if (!data.userId) {
      message.error("Seleccione un Cliente");
    } else {
      saveApp(
        {
          ...data,
          appId: appId || "",
          rootId: sessionStoreRedux.currentSession_id,
        },
        {
          onSuccess: (response) => {
            setSelectedApp(response.result);
            showGlobalNotification("success", t("inHorabuena"), t("successfulProcess"));
          },
          onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
          onFinally: () => handleCloseModal(),
        }
      );
    }
  };

  const onValuesChange = (values) => {
    setSelectedApp({ ...selectedApp, ...values });
  };

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

  const handlePlan = (value) => {
    setSelectedApp({ ...selectedApp, planId: value });
  };

  const handleUser = (value) => {
    setSelectedApp({ ...selectedApp, userId: value });
  };

  return (
    <BaseModal
      isOpenModal={openModal}
      closeModal={handleCloseModal}
      onCancel={handleCloseModal}
      onConfirm={() => handleSubmit()}
      title={appId ? `${t("edit")} ${t("application")}` : `${t("new")} ${t("application")}`}
      width={700}
      confirmText={t("save")}
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
        <div className="layout-form-modal entity-400 entity-small">
          {loaderForm ? (
            <>
              <Spin tip={t("loading")} />
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
                          {t("general")}
                        </span>
                      }
                      key="1"
                    >
                      <Row gutter={15} style={{ paddingBottom: 10 }}>
                        <Col span={24}>
                          <Form.Item name="packId2" tooltip="Firstname here pleaseio" label={t("plan")}>
                            <SelectPlans
                              reload={reload}
                              currentValue={selectedApp?.planId}
                              defaultValue={selectedApp?.planId}
                              returnData={handlePlan}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={15} style={{ paddingBottom: 10 }}>
                        <Col span={24}>
                          <Form.Item name="packId2" tooltip="Firstname here pleaseio" label={t("customer")}>
                            <SelectUsers
                              reload={reload}
                              currentValue={selectedApp?.userId}
                              defaultValue={selectedApp?.userId}
                              returnData={handleUser}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item name="startdate" label={t("startdate")} {...configDatePicker}>
                            <DatePicker showTime format="YYYY/MM/DD" use12Hours="true" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="closuredate" label={t("enddate")} {...configDatePicker}>
                            <DatePicker showTime format="YYYY/MM/DD" use12Hours="true" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item name="observation" label={t("description")}>
                            <TextArea showCount="true" onResize="false" value={selectedApp?.observation} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item name="active" labelAlign="right" label={t("active")}>
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
                          <Form.Item name="price" label={t("price")}>
                            <InputNumber
                              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                              value={selectedApp?.price}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item name="category" label={t("category")}>
                            <Select className="select-form-modal">
                              <Option value={constantsApp.CATEGORIES["CATEGORIA 01"]}>
                                {constantsApp.CATEGORIES["CATEGORIA 01"]}
                              </Option>
                              <Option value={constantsApp.CATEGORIES["CATEGORIA 02"]}>
                                {constantsApp.CATEGORIES["CATEGORIA 02"]}
                              </Option>
                              <Option value={constantsApp.CATEGORIES["CATEGORIA 03"]}>
                                {constantsApp.CATEGORIES["CATEGORIA 03"]}
                              </Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item name="duration" label={t("duration")}>
                            <Input value={selectedApp?.duration} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane
                      tab={
                        <span>
                          <AndroidOutlined />
                          {t("advanced")}
                        </span>
                      }
                      key="2"
                    >
                      <Row gutter={16}>
                        <Col span={4}>
                          <Form.Item name="minLimit" label={t("minimum")}>
                            <InputNumber min={1} max={20} defaultValue={1} value={selectedApp?.minLimit} />{" "}
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item name="maxLimit" label={t("maximum")}>
                            <InputNumber min={1} max={20} defaultValue={1} value={selectedApp?.maxLimit} />{" "}
                          </Form.Item>
                        </Col>
                        <Col span={10}>
                          <Form.Item name="departurePlace" label={t("location")}>
                            <Input value={selectedApp?.departurePlace} />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item name="public" labelAlign="right" label={t("public")}>
                            <Switch checked={!!selectedApp?.public} onChange={handlePublic} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item name="featureImage" label={t("featureImage")}>
                            <Input value={selectedApp?.featureImage} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="tag" label={t("tags")}>
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
