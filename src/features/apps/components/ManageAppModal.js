import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Form, Row, Col, Input, Select, Spin, DatePicker, Switch, Tabs } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";

import { saveApp } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";

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

const ManageAppModal = ({ getApp, appId, openModal, closeModal, refetch, initialValues, setSelectedAppMain, t }) => {
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
    setSelectedApp({
      ...selectedApp,
      startdate: moment(moment().format("YYYY/MM/DD HH"), "YYYY/MM/DD HH"),
      closuredate: moment(moment().add(1, "hours").format("YYYY/MM/DD HH"), "YYYY/MM/DD HH"),
    });
  }, [openModal]);

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
    saveApp(
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
          showGlobalNotification("success", t("inHorabuena"), t("successfulProcess"));
        },
        onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
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
      title={appId ? `${t("edit")} ${t("application")}` : `${t("new")} ${t("application")}`}
      width={700}
      confirmText={t("save")}
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
                          {t("general")}
                        </span>
                      }
                      key="1"
                    >
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item name="startdate" label={t("startdate")} {...configDatePicker}>
                            <DatePicker showTime format="YYYY/MM/DD HH" use12Hours="true" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          {/* <Form.Item name="reference1" label={t("enddate")}>
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
                            */}
                          <Form.Item name="closuredate" label={t("enddate")} {...configDatePicker}>
                            <DatePicker showTime format="YYYY/MM/DD HH" use12Hours="true" />
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
                            <Input value={selectedApp?.price} />
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
                        <Col span={6}>
                          <Form.Item name="minLimit" label={t("minimum")}>
                            <Input value={selectedApp?.minLimit} />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item name="maxLimit" label={t("maximum")}>
                            <Input value={selectedApp?.maxLimit} />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item name="departurePlace" label={t("location")}>
                            <Input value={selectedApp?.departurePlace} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
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
