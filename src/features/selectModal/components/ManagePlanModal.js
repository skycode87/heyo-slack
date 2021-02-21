import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { useTranslation } from "react-i18next";

import { Form, Row, Col, Input, Select, Spin, Descriptions } from "antd";
import showGlobalNotification from "../../../helpers/showGlobalNotification";

const { Option } = Select;

const ManageAppModal = ({
  getApp,
  appId,
  formData,
  closeModal,
  refetch,
  initialValues,
  setFormData,
  dataRow,
  handleSave,
}) => {
  const { t, i18n } = useTranslation();
  const [selectedApp, setSelectedApp] = useState(initialValues);
  const [form] = Form.useForm();
  const [requestData, setRequestData] = useState({});
  const [loaderForm, setLoaderForm] = useState(false);

  useEffect(() => {
    if (appId) {
      setLoaderForm(true);
      getApp(appId, {
        onSuccess: (response) => {
          setSelectedApp(response.result);
          setLoaderForm(false);
        },
        onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
      });
    } else {
      setSelectedApp(initialValues);
    }
  }, [appId]);

  useEffect(() => {
    if (requestData.message) {
      closeModal();
      showGlobalNotification("success", t("inHorabuena"), t("successfulProcess"));
      if (!appId) setSelectedApp(initialValues);
      refetch();
    }
  }, [requestData]);

  useEffect(() => {
    form.setFieldsValue({
      ...formData,
      amount: dataRow.price,
      total: dataRow.price,
      fullname: `${formData.userId.firstname} ${formData.userId.lastname}`,
      email: `${formData.userId.email}`,
      phone: `${formData.userId.phone}`,
      mode: "Efectivo",
      pending: 0,
      status: "Por confirmar",
    });
    setFormData({
      ...formData,
      amount: dataRow.price,
      total: dataRow.price,
      fullname: `${formData.userId.firstname} ${formData.userId.lastname}`,
      email: `${formData.userId.email}`,
      phone: `${formData.userId.phone}`,
      mode: "Efectivo",
      pending: 0,
      status: "Por confirmar",
    });
  }, [dataRow]);

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, selectedApp, formData]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onValuesChange = debounce((values) => {
    console.log(values);
    if (values?.amount) {
      if (parseFloat(values.amount) <= parseFloat(formData.total)) {
        setFormData({ ...formData, ...values, pending: formData.total - values.amount });
      } else {
        setFormData({ ...formData, ...values, amount: formData.amount });
      }
    } else {
      setFormData({ ...formData, ...values });
    }
  }, 500);

  return (
    <Form
      form={form}
      name="manage-category-form-modal"
      initialValues={initialValues}
      className="manage-modal"
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
            <Descriptions size="small" column={2} style={{ marginBottom: 20 }}>
              <Descriptions.Item label={t("name")}>{dataRow.name}</Descriptions.Item>
              <Descriptions.Item label={t("duration")}>{dataRow.duration}</Descriptions.Item>
              <Descriptions.Item label={t("category")}>{dataRow.category}</Descriptions.Item>
              <Descriptions.Item label={t("price")}>{dataRow.price}</Descriptions.Item>
            </Descriptions>
            <Row gutter={15}>
              <Col span={18}>
                <Form.Item name="observation" label={t("observations")}>
                  <Input value={selectedApp?.observation} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="status" label={t("status")}>
                  <Select className="select-form-modal">
                    <Option value="Por confirmar">Por confirmar</Option>
                    <Option value="Confirmado">Confirmado</Option>
                    <Option value="Anulado">Anulado</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={15}>
              <Col span={7}>
                <Form.Item name="mode" label={t("mode")}>
                  <Select className="select-form-modal">
                    <Option value="Transferencia">Transferencia</Option>
                    <Option value="efectivo">Efectivo</Option>
                    <Option value="Debito">Debito</Option>
                    <Option value="Credito">Credito</Option>
                    <Option value="Otro">Otro</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="reference" label={t("reference")}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item name="description" label={t("description")}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="fullname" label={t("fullname")}>
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
            <Row gutter={16} style={{ backgroundColor: "#FFE79F", paddingTop: 10, marginTop: 10, borderRadius: 5 }}>
              <Col span={8}>
                <Form.Item label={t("amountToPay")} name="amount">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={t("isPending")} name="pending">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={t("totalToPay")} name="total">
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
      </div>
    </Form>
  );
};

ManageAppModal.defaultProps = {
  setAppId: () => {},
};

export default ManageAppModal;
