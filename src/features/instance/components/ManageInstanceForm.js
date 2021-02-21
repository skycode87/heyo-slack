import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash/debounce";
import { confirmAlert } from "react-confirm-alert";

import { Form, Row, Col, Input, Spin, Button } from "antd";
import { saveInstance, getInstance } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import { setInstanceRedux } from "../../../redux/instance";

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

const ManageInstanceForm = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const sessionStoreRedux = useSelector((store) => store.session);

  const [selectedInstance, setSelectedInstance] = useState(defaultValues);
  const [form] = Form.useForm();
  const [loaderForm, setLoaderForm] = useState(false);

  useEffect(() => {
    setLoaderForm(true);
    getInstance(true, {
      onSuccess: (response) => {
        setInstanceRedux(response.result)(dispatch);
        setSelectedInstance({
          ...response.result,
        });
        setLoaderForm(false);
      },
      onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
    });
  }, []);

  useEffect(() => {
    form.setFieldsValue(selectedInstance);
  }, [form, selectedInstance]);

  const onFinish = (values) => {
    const data = { ...selectedInstance, ...values };

    saveInstance(
      {
        ...data,
        rootId: sessionStoreRedux.currentSession_id,
      },
      {
        onSuccess: (response) => {
          setInstanceRedux(response.result)(dispatch);
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
    setSelectedInstance({ ...selectedInstance, ...values });
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
              <Col span={8}>
                <Form.Item
                  name="name"
                  tooltip="Firstname here pleaseio"
                  label={t("name")}
                  rules={[
                    {
                      required: true,
                      message: `Por favor ingrese el nombre`,
                    },
                  ]}
                >
                  <Input placeholder="" value={selectedInstance?.name} />
                </Form.Item>
              </Col>

              <Col span={16}>
                <Form.Item
                  name="background"
                  label={t("background")}
                  rules={[{ required: true, message: `Por favor ingrese el background` }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="facebook" label={t("facebook")}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="instagram" label={t("instagram")}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="youtube" label={t("youtube")}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="website" label={t("website")}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="email" label={t("email")}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="phone" label={t("phone")}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="logo" label={t("logo")}>
                  <Input />
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

ManageInstanceForm.defaultProps = {
  setInstanceId: () => {},
};

export default ManageInstanceForm;
