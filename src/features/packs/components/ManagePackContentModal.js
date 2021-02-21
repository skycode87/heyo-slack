import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactQuill from "react-quill";

import { Form, Row, Col, Input, Select, Spin, DatePicker, Switch, InputNumber } from "antd";
import { savePackContent, getPack } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";
import { constantsPack } from "../constants";
import { setPackRedux } from "../../../redux/pack";

import "react-quill/dist/quill.snow.css"; // ES6

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
  name: "",
  category: "",
  active: true,
  featureImage: "",
  tag: "",
  body: "",
  public: false,
  startdate: moment(moment().format("YYYY-MM-DD"), "YYYY/MM/DD"),
  closuredate: moment(moment().format("YYYY-MM-DD"), "YYYY/MM/DD"),
};

const ManagePackModal = ({ setPackId, packId, openModal, closeModal, refetch, t }) => {
  const dispatch = useDispatch();
  const sessionStoreRedux = useSelector((store) => store.session);

  const [form] = Form.useForm();

  const [selectedPack, setSelectedPack] = useState(defaultValues);
  const [loaderForm, setLoaderForm] = useState(false);
  const [mode, setMode] = useState(null);
  const [reload, setReload] = useState(0);

  const handleReset = () => {
    setSelectedPack(defaultValues);
    setReload(Math.floor(Math.random() * 100000));
  };

  useEffect(() => {
    if (openModal) {
      if (packId) {
        setMode("edit");
      } else {
        setMode("new");
      }
    } else {
      handleReset();
      setMode(null);
      setPackId(null);
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
      getPack(packId, {
        onSuccess: (response) => {
          setPackRedux(response.result)(dispatch);
          setSelectedPack({
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
    form.setFieldsValue(selectedPack);
  }, [form, selectedPack]);

  const handleCloseModal = () => {
    refetch();
    closeModal();
  };

  const onFinish = (values) => {
    const data = { ...selectedPack, ...values };
    savePackContent(
      {
        ...data,
        packId,
        rootId: sessionStoreRedux.currentSession_id,
      },
      {
        onSuccess: (response) => {
          setPackRedux(response.result)(dispatch);

          showGlobalNotification("success", t("inHorabuena"), t("successfulProcess"));
        },
        onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
        onFinally: () => handleCloseModal(),
      }
    );
  };

  const onValuesChange = (values) => {
    setSelectedPack({ ...selectedPack, ...values });
  };

  const handleSubmit = () => {
    form.validateFields().then(() => {
      form.submit();
    });
  };

  const handleActive = (checked) => {
    setSelectedPack({ ...selectedPack, active: checked });
  };

  const handlePublic = (checked) => {
    setSelectedPack({ ...selectedPack, public: checked });
  };

  return (
    <BaseModal
      isOpenModal={openModal}
      closeModal={handleCloseModal}
      onCancel={handleCloseModal}
      onConfirm={() => handleSubmit()}
      title={packId ? "Editar Paquete" : "Nuevo Paquete"}
      width={1000}
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
        <div className="layout-form-modal entity-550 entity-small">
          {loaderForm ? (
            <>
              <Spin tip={t("loading")} />
            </>
          ) : (
            <>
              <Row gutter={15}>
                <Col span={18}>
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
                    <Input placeholder="" value={selectedPack?.name} />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item name="category" label={t("category")}>
                    <Select className="select-form-modal">
                      <Option value={constantsPack.CATEGORIES["CATEGORIA 01"]}>
                        {constantsPack.CATEGORIES["CATEGORIA 01"]}
                      </Option>
                      <Option value={constantsPack.CATEGORIES["CATEGORIA 02"]}>
                        {constantsPack.CATEGORIES["CATEGORIA 02"]}
                      </Option>{" "}
                      <Option value={constantsPack.CATEGORIES["CATEGORIA 03"]}>
                        {constantsPack.CATEGORIES["CATEGORIA 0"]}
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={3}>
                  <Form.Item name="active" labelAlign="right" label={t("active")}>
                    <Switch checked={!!selectedPack?.active} onChange={handleActive} />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="public" labelAlign="right" label={t("public")}>
                    <Switch checked={!!selectedPack?.public} onChange={handlePublic} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="featureImage" label={t("featureImage")}>
                    <Input value={selectedPack?.featureImage} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="tag" label={t("tags")}>
                    <Input value={selectedPack?.tag} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={11}>
                  <Form.Item name="startdate" label={t("startadate")} {...configDatePicker}>
                    <DatePicker format="YYYY/MM/DD" />
                  </Form.Item>
                </Col>
                <Col span={2} />
                <Col span={11}>
                  <Form.Item name="closuredate" label={t("closuredate")} {...configDatePicker}>
                    <DatePicker format="YYYY/MM/DD" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="body" label={t("body")}>
                    <ReactQuill id="receipt" theme="snow" value={selectedPack?.body} />
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

ManagePackModal.defaultProps = {
  setPackId: () => {},
};

export default ManagePackModal;
