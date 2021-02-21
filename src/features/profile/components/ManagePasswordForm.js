/* eslint-disable prefer-promise-reject-errors */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash/debounce";
import { confirmAlert } from "react-confirm-alert";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { Form, Row, Col, Input, Spin, Button, message } from "antd";
import { savePasswordProfile, getProfile } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import { setProfileRedux } from "../../../redux/profile";

const defaultValues = {
  password: "",
  oldPassword: "",
  passwordConfirm: "",
};

const ManageProfileForm = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const sessionStoreRedux = useSelector((store) => store.session);

  const [selectedProfile, setSelectedProfile] = useState(defaultValues);
  const [form] = Form.useForm();
  const [loaderForm, setLoaderForm] = useState(false);

  useEffect(() => {
    setLoaderForm(true);
    getProfile(true, {
      onSuccess: (response) => {
        setProfileRedux(response.result)(dispatch);
        setSelectedProfile({
          ...response.result,
        });
        setLoaderForm(false);
      },
      onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
    });
  }, []);

  useEffect(() => {
    form.setFieldsValue(selectedProfile);
  }, [form, selectedProfile]);

  const onFinish = (values) => {
    const data = { ...selectedProfile, ...values };

    if (data.password === data.passwordConfirm) {
      savePasswordProfile(
        {
          ...data,
          rootId: sessionStoreRedux.currentSession_id,
        },
        {
          onSuccess: (response) => {
            setProfileRedux(response.result)(dispatch);
            showGlobalNotification("success", t("inHorabuena"), t("successfulProcess"));
          },
          onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
          onFinally: () => {},
        }
      );
    } else {
      message.error("Las contrasenas no coinciden");
    }
  };

  const handleFinishConfirm = (values) => {
    confirmAlert({
      title: t("update"),
      message: `Esta seguro que desea continuar ?`,
      buttons: [
        {
          label: t("yes"),
          onClick: () => onFinish(values),
        },
        {
          label: t("no"),
          onClick: () => {},
        },
      ],
    });
  };

  const onValuesChange = debounce((values) => {
    setSelectedProfile({ ...selectedProfile, ...values });
  }, 500);

  const handleSubmit = () => {
    form.validateFields().then(() => {
      form.submit();
    });
  };

  return (
    <Form
      form={form}
      name="manage-category-form-modal"
      initialValues={defaultValues}
      className="manage-modal"
      onFinish={handleFinishConfirm}
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
            <Row gutter={15}>
              <Col span={6}>
                <Form.Item
                  name="oldPassword"
                  tooltip="Firstname here pleaseio"
                  label={t("oldPassword")}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                  ]}
                >
                  <Input.Password iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="password"
                  tooltip="Firstname here pleaseio"
                  label={t("password")}
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="passwordConfirm"
                  tooltip="Firstname here pleaseio"
                  label="Repetir password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject("The two passwords that you entered do not match!");
                      },
                    }),
                  ]}
                >
                  <Input.Password iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item>
                  <Button style={{ float: "right" }} type="primary" onClick={handleSubmit}>
                    {t("update")} {t("password")}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
      </div>
    </Form>
  );
};

ManageProfileForm.defaultProps = {
  setProfileId: () => {},
};

export default ManageProfileForm;
