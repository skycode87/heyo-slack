import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash/debounce";
import { Form, Row, Col, Input, Select, Spin, DatePicker, Switch, Typography, message } from "antd";
import { saveUser, getUser } from "../requests";
import { saveApp } from "../../apps/requests";

import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";
import { setUserRedux } from "../../../redux/user";
import SelectPlans from "../../plans/components/SelectPlans";

import SelectUsers from "./SelectUsers";

const moment = require("moment");

const { Title, Link } = Typography;

const { Option } = Select;

const defaultValues = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  address: "",
  birthdate: moment(moment().format("YYYY-MM-DD"), "YYYY/MM/DD"),
  departurePlace: "",
  category: "",
  duration: "",
  active: true,
  public: false,
  price: 0,
  startdate: moment(moment().format("YYYY-MM-DD"), "YYYY/MM/DD HH:mm"),
  closuredate: moment(moment().format("YYYY-MM-DD"), "YYYY/MM/DD HH:mm"),
  planId: null,
  refererId: null,
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

const ManageUserModal = ({ userId, openModal, closeModal, refetch, t, setUserId }) => {
  const dispatch = useDispatch();
  const sessionStoreRedux = useSelector((store) => store.session);
  const [form] = Form.useForm();
  const [selectedUser, setSelectedUser] = useState(defaultValues);
  const [loaderForm, setLoaderForm] = useState(false);
  const [mode, setMode] = useState(null);
  const [reload, setReload] = useState(0);

  const handleReset = () => {
    setSelectedUser(defaultValues);
    setReload(Math.floor(Math.random() * 100000));
  };

  useEffect(() => {
    if (openModal) {
      if (userId) {
        setMode("edit");
      } else {
        setMode("new");
      }
    } else {
      handleReset();
      setMode(null);
      setUserId(null);
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
      getUser(userId, {
        onSuccess: (response) => {
          setUserRedux(response.user)(dispatch);
          setSelectedUser({
            ...response.user,
            startdate: moment(response.user.startdate, "YYYY/MM/DD") || moment("2020/12/12", "YYYY/MM/DD"),
            closuredate: moment(response.user.closuredate, "YYYY/MM/DD") || moment("2020/12/12", "YYYY/MM/DD"),
            birthdate: moment(response.user.birthdate, "YYYY/MM/DD") || moment("2020/12/12", "YYYY/MM/DD"),
          });
          setLoaderForm(false);
        },
        onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
      });
    }
  }, [mode]);

  useEffect(() => {
    form.setFieldsValue(selectedUser);
  }, [form, selectedUser]);

  const handleCloseModal = () => {
    refetch();
    closeModal();
  };

  const onFinish = (values) => {
    const data = { ...selectedUser, ...values };
    if (!data.refererId) {
      message.error("This is an error message");
    } else {
      saveUser(
        {
          ...data,
          userId,
          rootId: sessionStoreRedux.currentSession_id,
        },
        {
          onSuccess: (response) => {
            setUserRedux(response.usuario)(dispatch);
            if (data.planId) {
              saveApp(
                {
                  ...data,
                  userId,
                  rootId: sessionStoreRedux.currentSession_id,
                },
                {
                  onSuccess: (response2) => {
                    showGlobalNotification("success", t("inHorabuena"), t("successfulProcess"));
                  },
                  onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
                  onFinally: () => handleCloseModal(),
                }
              );
            }
          },
          onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
          onFinally: () => handleCloseModal(),
        }
      );
    }
  };

  const onValuesChange = (values) => {
    setSelectedUser({ ...selectedUser, ...values });
  };

  const dateFormat = "YYYY/MM/DD";

  const handleSubmit = () => {
    form.validateFields().then(() => {
      form.submit();
    });
  };

  const handleActive = (checked) => {
    setSelectedUser({ ...selectedUser, active: checked });
  };

  const handleReferer = (value) => {
    setSelectedUser({ ...selectedUser, refererId: value });
  };

  const handlePlan = (value) => {
    setSelectedUser({ ...selectedUser, planId: value });
  };

  return (
    <BaseModal
      isOpenModal={openModal}
      closeModal={handleCloseModal}
      onCancel={handleCloseModal}
      onConfirm={() => handleSubmit()}
      title={userId ? `${t("edit")} ${t("customer")}` : `${t("new")} ${t("customer")}`}
      width={1000}
      confirmText={t("save")}
      isCloseModal
      top={10}
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
        <div className="layout-form-modal entity-450 entity-small">
          {loaderForm ? (
            <>
              <Spin tip={t("loading")} />
            </>
          ) : (
            <>
              <Row gutter={15} style={{ paddingBottom: 10 }}>
                <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item name="users" tooltip="Firstname here pleaseio" label={t("customer")}>
                    <SelectUsers
                      reload={reload}
                      currentValue={selectedUser?.userId}
                      defaultValue={selectedUser?.userId}
                      returnData={handleReferer}
                    />
                  </Form.Item>
                </Col>

                <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item name="planes" tooltip="Firstname here pleaseio" label={t("plans")}>
                    <SelectPlans
                      reload={reload}
                      currentValue={selectedUser?.userId}
                      defaultValue={selectedUser?.userId}
                      returnData={handlePlan}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12} xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Item
                    name="firstname"
                    tooltip="Firstname here pleaseio"
                    label="Nombre"
                    rules={[
                      {
                        required: true,
                        message: `Por favor ingrese el nombre`,
                      },
                    ]}
                  >
                    <Input placeholder="" value={selectedUser.firstname} />
                  </Form.Item>
                </Col>
                <Col span={12} xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Item
                    name="lastname"
                    label="Apellidos"
                    rules={[
                      {
                        required: true,
                        message: `Por favor ingrese el apellido`,
                      },
                    ]}
                  >
                    <Input value={selectedUser.lastname} />
                  </Form.Item>
                </Col>
                <Col span={12} xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Item
                    name="email"
                    label={t("email")}
                    rules={[{ required: true, message: `Por favor ingrese el email` }]}
                  >
                    <Input value={selectedUser.email} />
                  </Form.Item>
                </Col>
                <Col span={12} xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Item
                    name="phone"
                    label={t("phone")}
                    rules={[
                      {
                        required: true,
                        message: `Por favor ingrese el numero telefonico`,
                      },
                    ]}
                  >
                    <Input value={selectedUser.phone} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12} xs={12} sm={12} md={5} lg={5} xl={5}>
                  <Form.Item name="documentType" label={t("documentType")}>
                    <Select className="select-form-modal">
                      <Option value="PASSPORT">Pasaporte</Option>
                      <Option value="DNI">DNI</Option>
                      <Option value="CEDULA_EXTRANJERIA">Cedula de Extranjeria</Option>
                      <Option value="OTRO">Otro</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12} xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Item name="document" label={t("document")}>
                    <Input value={selectedUser.document} />
                  </Form.Item>
                </Col>
                <Col span={12} xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Item name="birthdate" label={t("birthdate")} {...config}>
                    <DatePicker format="YYYY/MM/DD" />
                  </Form.Item>
                </Col>
                <Col span={12} xs={12} sm={12} md={7} lg={7} xl={7}>
                  <Form.Item name="type" label={t("clasification")}>
                    <Input value={selectedUser.type} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item name="address" label={t("address")}>
                    <Input value={selectedUser.address} />
                  </Form.Item>
                </Col>
                <Col span={4} xs={12} sm={12} md={4} lg={4} xl={4}>
                  <Form.Item name="city" label={t("city")}>
                    <Input value={selectedUser.city} />
                  </Form.Item>
                </Col>
                <Col span={4} xs={12} sm={12} md={4} lg={4} xl={4}>
                  <Form.Item name="region" label={t("region")}>
                    <Input value={selectedUser.region} />
                  </Form.Item>
                </Col>
                <Col span={4} xs={12} sm={12} md={4} lg={4} xl={4}>
                  <Form.Item name="country" label={t("country")}>
                    <Input value={selectedUser.country} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Form.Item name="observation" label={t("observation")}>
                    <Input value={selectedUser.observation} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={0} style={{ paddingTop: 15, paddingBottom: 5 }}>
                <Title level={5}> Acerca del Gimnasio</Title>
              </Row>
              <Row gutter={16}>
                <Col span={6} xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Item name="startdate" label={t("startdate")} {...config}>
                    <DatePicker format="YYYY/MM/DD" />
                  </Form.Item>
                </Col>
                <Col span={6} xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Item name="closuredate" label={t("enddate")} {...config}>
                    <DatePicker format="YYYY/MM/DD" />
                  </Form.Item>
                </Col>
                <Col span={6} xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Item name="reference" label={t("referer")}>
                    <Select className="select-form-modal">
                      <Option value="website">website</Option>
                      <Option value="instagram">instagram</Option>
                      <Option value="amistad">amistad</Option>
                      <Option value="facebook">facebook</Option>
                      <Option value="otro">otro</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6} xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Item name="active" labelAlign="right" label={t("active")}>
                    <Switch checked={!!selectedUser.active} onChange={handleActive} />
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

ManageUserModal.defaultProps = {
  setUserId: () => {},
};

export default ManageUserModal;
