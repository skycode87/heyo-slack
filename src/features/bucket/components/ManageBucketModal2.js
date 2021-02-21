import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import debounce from "lodash/debounce";

import { Form, Row, Col, Input, Select, Spin, Switch } from "antd";
import { updateBucket, getBucket } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";
import { setBucketRedux } from "../../../redux/bucket";

const { TextArea } = Input;
const { Option } = Select;

const defaultValues = {
  title: "",
  description: "",
  type: "",
  active: "",
  public: "",
};

const ManageBucketModal = ({ bucketId, openModal, closeModal, refetch, setBucketId }) => {
  const dispatch = useDispatch();
  const sessionStoreRedux = useSelector((store) => store.session);
  const { t, i18n } = useTranslation();

  const [selectedBucket, setSelectedBucket] = useState(defaultValues);
  const [form] = Form.useForm();
  const [loaderForm, setLoaderForm] = useState(false);
  const [mode, setMode] = useState(null);
  const [reload, setReload] = useState(0);

  const handleReset = () => {
    setSelectedBucket(defaultValues);
    setReload(Math.floor(Math.random() * 100000));
  };

  useEffect(() => {
    if (openModal) {
      if (bucketId) {
        setMode("edit");
      } else {
        setMode("new");
      }
    } else {
      handleReset();
      setMode(null);
      setBucketId(null);
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
      getBucket(bucketId, {
        onSuccess: (response) => {
          setBucketRedux(response.result)(dispatch);
          setSelectedBucket({
            ...response.result,
          });
          setLoaderForm(false);
        },
        onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
      });
    }
  }, [mode]);

  useEffect(() => {
    form.setFieldsValue(selectedBucket);
  }, [form, selectedBucket]);

  const handleCloseModal = () => {
    refetch();
    closeModal();
  };

  const onFinish = (values) => {
    const data = { ...selectedBucket, ...values };
    updateBucket(
      {
        ...data,
        bucketId,
        rootId: sessionStoreRedux.currentSession_id,
      },
      {
        onSuccess: (response) => {
          setBucketRedux(response.result)(dispatch);
          showGlobalNotification("success", t("inHorabuena"), t("successfulProcess"));
        },
        onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
        onFinally: () => handleCloseModal(),
      }
    );
  };

  const onValuesChange = debounce((values) => {
    setSelectedBucket({ ...selectedBucket, ...values });
  }, 500);

  const handleSubmit = () => {
    form.validateFields().then(() => {
      form.submit();
    });
  };

  const handleActive = (checked) => {
    setSelectedBucket({ ...selectedBucket, active: checked });
  };

  const handlePublic = (checked) => {
    setSelectedBucket({ ...selectedBucket, public: checked });
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
  return (
    <BaseModal
      isOpenModal={openModal}
      closeModal={handleCloseModal}
      onCancel={handleCloseModal}
      onConfirm={() => handleSubmit()}
      title={bucketId ? "Editar Bucket" : "Nuevo Bucket"}
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
        <div className="layout-form-modal entity-300 entity-small">
          {loaderForm ? (
            <>
              <Spin tip={t("loading")} />
            </>
          ) : (
            <>
              <Row gutter={15}>
                <Col span={16}>
                  <Form.Item
                    name="title"
                    tooltip="Firstname here pleaseio"
                    label={t("title")}
                    rules={[
                      {
                        required: true,
                        message: `Por favor ingrese el nombre`,
                      },
                    ]}
                  >
                    <Input placeholder="" value={selectedBucket?.title} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="type" label={t("type")}>
                    <Select className="select-form-modal">
                      <Option value="Avatar">Avatar</Option>
                      <Option value="Cover">Cover</Option>
                      <Option value="Gallery">Gallery</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Form.Item name="public" labelAlign="right" label={t("public")}>
                    <Switch checked={!!selectedBucket?.public} onChange={handlePublic} />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Form.Item name="active" labelAlign="right" label={t("active")}>
                    <Switch checked={!!selectedBucket?.active} onChange={handleActive} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="description" label={t("description")}>
                    <TextArea showCount="true" onResize="false" value={selectedBucket?.description} />
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

ManageBucketModal.defaultProps = {
  setBucketId: () => {},
};

export default ManageBucketModal;
