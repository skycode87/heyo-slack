import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash/debounce";
import { confirmAlert } from "react-confirm-alert";

import { Form, Row, Col, Input, Spin, Button } from "antd";
import { saveProfile, getProfile } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import { setProfileRedux } from "../../../redux/profile";
import { setSessionRedux } from "../../../redux/session";

const defaultValues = {
  name: "",
  email: "",
  phone: "",
  facebook: "",
  instagram: "",
  youtube: "",
  active: true,
  color: "",
  cover: "",
  background: "",
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

    saveProfile(
      {
        ...data,
        rootId: sessionStoreRedux.currentSession_id,
      },
      {
        onSuccess: (response) => {
          setProfileRedux(response.result)(dispatch);
          setSessionRedux(response.result)(dispatch);

          showGlobalNotification("success", t("inHorabuena"), t("successfulProcess"));
        },
        onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
        onFinally: () => {},
      }
    );
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
      <div className="layout-form-modal entity-200 entity-small">
        {loaderForm ? (
          <>
            <Spin tip={t("loading")} />
          </>
        ) : (
          <>
            <Row gutter={15}>
              <Col span={6}>
                <Form.Item name="firstname" tooltip="Firstname here pleaseio" label={t("firstname")}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="lastname" tooltip="Firstname here pleaseio" label={t("lastname")}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="email" tooltip="Firstname here pleaseio" label={t("email")}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="phone" tooltip="phone here please" label={t("phone")}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item name="avatar" label={t("avatar")}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="login" tooltip="phone here please" label={t("login")}>
                  <Input disabled="true" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="date" tooltip="phone here please" label={t("date")}>
                  <Input disabled="true" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item>
                  <Button style={{ float: "right" }} type="primary" onClick={handleSubmit}>
                    {t("update")}
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
