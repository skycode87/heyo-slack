import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Form, Row, Col, Input, Select, Spin, DatePicker, Descriptions, Switch, message, Typography } from "antd";
import { saveGuest, getGuest } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";
import { setGuestRedux } from "../../../redux/guest";
import SelectUsers from "../../users/components/SelectUsers";

const moment = require("moment");

const { Title, Link } = Typography;

const { Option } = Select;

const defaultValues = {
  firstname: "Pedro Rojas",
  lastname: "",
  email: "",
  phone: "",
  address: "",
  birthdate: "",
  departurePlace: "Los Patios",
  category: "",
  duration: "12 horas",
  active: true,
  public: false,
  price: 0,
  userId: null,
  startdate: moment(moment().format("YYYY-MM-DD"), "YYYY/MM/DD HH:mm"),
  closuredate: moment(moment().format("YYYY-MM-DD"), "YYYY/MM/DD HH:mm"),
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
const ManageGuestModal = ({
  guestId,
  openModal,
  closeModal,
  refetch,
  initialValues,
  selectedUserData,
  setGuestId,
  t,
}) => {
  const dispatch = useDispatch();
  const sessionStoreRedux = useSelector((store) => store.session);

  const [form] = Form.useForm();
  const [selectedGuest, setSelectedGuest] = useState(initialValues);
  const [loaderForm, setLoaderForm] = useState(false);
  const [mode, setMode] = useState(null);
  const [reload, setReload] = useState(0);

  const handleReset = () => {
    setSelectedGuest(defaultValues);
    setReload(Math.floor(Math.random() * 100000));
  };

  useEffect(() => {
    if (openModal) {
      if (guestId) {
        setMode("edit");
      } else {
        setMode("new");
      }
    } else {
      handleReset();
      setMode(null);
      setGuestId(null);
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
      getGuest(guestId, {
        onSuccess: (response) => {
          setGuestRedux(response.result)(dispatch);
          setSelectedGuest({
            ...response.result,
            startdate: moment(response.result.startdate, "YYYY/MM/DD") || moment("2020/12/12", "YYYY/MM/DD"),
            closuredate: moment(response.result.closuredate, "YYYY/MM/DD") || moment("2020/12/12", "YYYY/MM/DD"),
            birthdate: moment(response.result.birthdate, "YYYY/MM/DD") || moment("2020/12/12", "YYYY/MM/DD"),
          });
          setLoaderForm(false);
        },
        onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
      });
    }
  }, [mode]);

  useEffect(() => {
    form.setFieldsValue(selectedGuest);
  }, [form, selectedGuest]);

  const handleCloseModal = () => {
    refetch();
    closeModal();
  };

  const onFinish = (values) => {
    const data = { ...selectedGuest, ...values };
    if (!data.userId) {
      message.error("This is an error message");
    } else {
      saveGuest(
        {
          ...data,
          guestId,
          rootId: sessionStoreRedux.currentSession_id,
        },
        {
          onSuccess: (response) => {
            setGuestRedux(response.result)(dispatch);
            showGlobalNotification("success", t("inHorabuena"), t("successfulProcess"));
          },
          onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
          onFinally: () => handleCloseModal(),
        }
      );
    }
  };

  const onValuesChange = (values) => {
    setSelectedGuest({ ...selectedGuest, ...values });
  };

  const handleUser = (value) => {
    setSelectedGuest({ ...selectedGuest, userId: value });
  };

  const handleSubmit = () => {
    form.validateFields().then(() => {
      form.submit();
    });
  };

  const handleActive = (checked) => {
    setSelectedGuest({ ...selectedGuest, active: checked });
  };

  return (
    <BaseModal
      isOpenModal={openModal}
      closeModal={handleCloseModal}
      onCancel={handleCloseModal}
      onConfirm={() => handleSubmit()}
      title={guestId ? `${t("edit")} ${t("guest")}` : `${t("new")} ${"guest"}`}
      width={1000}
      confirmText={t("save")}
      isCloseModal
      top={50}
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
        <div className="layout-form-modal entity-guest">
          {loaderForm ? (
            <>
              <Spin tip={t("loading")} />
            </>
          ) : (
            <>
              <Row gutter={16}>
                <Col span={24}>
                  {selectedUserData?._id && (
                    <Descriptions size="small" column={3} style={{ marginBottom: 20 }}>
                      <Descriptions.Item label={t("fullname")}>
                        {`${selectedUserData?.firstname} ${selectedUserData?.lastname} `}
                      </Descriptions.Item>
                      <Descriptions.Item label={t("email")}>{selectedUserData?.email}</Descriptions.Item>
                      <Descriptions.Item label={t("document")}>{selectedUserData?.document}</Descriptions.Item>
                    </Descriptions>
                  )}
                </Col>
              </Row>
              <Row gutter={15} style={{ paddingBottom: 10 }}>
                <Col span={24}>
                  <Form.Item name="packId2" tooltip="Firstname here pleaseio" label={t("customer")}>
                    <SelectUsers
                      reload={reload}
                      currentValue={selectedGuest?.userId}
                      defaultValue={selectedGuest?.userId}
                      returnData={handleUser}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    name="firstname"
                    tooltip="Firstname here pleaseio"
                    label={t("firstname")}
                    rules={[
                      {
                        required: true,
                        message: `Por favor ingrese el nombre`,
                      },
                    ]}
                  >
                    <Input placeholder="" value={selectedGuest?.firstname} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="lastname"
                    label={t("lastname")}
                    rules={[
                      {
                        required: true,
                        message: `Por favor ingrese el apellido`,
                      },
                    ]}
                  >
                    <Input value={selectedGuest?.lastname} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="email"
                    label={t("email")}
                    rules={[{ required: true, message: `Por favor ingrese el email` }]}
                  >
                    <Input value={selectedGuest?.email} />
                  </Form.Item>
                </Col>
                <Col span={6}>
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
                    <Input value={selectedGuest?.phone} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={5}>
                  <Form.Item name="documentType" label={t("documentType")}>
                    <Select className="select-form-modal">
                      <Option value="PASSPORT">Pasaporte</Option>
                      <Option value="DNI">DNI</Option>
                      <Option value="CEDULA_EXTRANJERIA">Cedula de Extranjeria</Option>
                      <Option value="OTRO">Otro</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="document" label={t("document")}>
                    <Input value={selectedGuest?.document} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="birthdate" label={t("birthdate")} {...config}>
                    <DatePicker format="YYYY/MM/DD" />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item name="type" label={t("type")}>
                    <Input value={selectedGuest?.type} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="address" label={t("address")}>
                    <Input value={selectedGuest?.address} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="city" label={t("city")}>
                    <Input value={selectedGuest?.city} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="region" label={t("region")}>
                    <Input value={selectedGuest?.region} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="country" label={t("country")}>
                    <Input value={selectedGuest?.country} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="observation" label={t("observation")}>
                    <Input value={selectedGuest?.observation} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={0} style={{ paddingTop: 15, paddingBottom: 5 }}>
                <Title level={5}> Acerca del Gimnasio</Title>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item name="startdate" label={t("startdate")} {...config}>
                    <DatePicker format="YYYY/MM/DD" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="closuredate" label={t("closuredate")} {...config}>
                    <DatePicker format="YYYY/MM/DD" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="reference" label="Medio Informativo">
                    <Select className="select-form-modal">
                      <Option value="website">website</Option>
                      <Option value="instagram">instagram</Option>
                      <Option value="amistad">amistad</Option>
                      <Option value="facebook">facebook</Option>
                      <Option value="otro">otro</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="active" labelAlign="right" label={t("active")}>
                    <Switch checked={!!selectedGuest?.active} onChange={handleActive} />
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

ManageGuestModal.defaultProps = {
  setGuestId: () => {},
};

export default ManageGuestModal;
