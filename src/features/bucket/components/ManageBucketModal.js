import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import PropTypes from "prop-types";

import { Form, Row, Col, Spin, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { saveImageBucket } from "../requests";

import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";
import { setBucketRedux } from "../../../redux/bucket";
import { globals, routes, numbers } from "../../../constants/globals";

const { Dragger } = Upload;

const defaultValues = {
  appId: null,
  amount: 0,
  userId: null,
};

const ManageBucketModal = ({
  entityId,
  bucketId,
  setBucketId,
  openModal,
  closeModal,
  refetch,
  entityProp,
  typeProp,
}) => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const { currentSession } = useSelector((store) => store.session);

  const [selectedBucket, setSelectedBucket] = useState(defaultValues);
  const [form] = Form.useForm();
  const [loaderForm, setLoaderForm] = useState(false);
  const [mode, setMode] = useState(null);
  const [reload, setReload] = useState(0);
  const [entity, setEntity] = useState("App");
  const [type, setType] = useState("Avatar");

  const handleReset = () => {
    setSelectedBucket(defaultValues);
    setReload(Math.floor(Math.random() * 100000));
  };

  useEffect(() => {
    if (entityProp) {
      setEntity(entityProp);
    }
  }, [entityProp]);

  useEffect(() => {
    if (typeProp) {
      setType(typeProp);
    }
  }, [typeProp]);

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

  const handleCloseModal = () => {
    refetch();
    closeModal();
  };

  const props = {
    name: "picture",
    action: `${routes.API_BUCKET}/${currentSession?.instanceId}/${entity}/${entityId}/${type}`,
    headers: {},
  };

  const onChange = (info) => {
    saveImageBucket(info, {
      onSuccess: () => {
        showGlobalNotification("success", t("inHorabuena"), t("successfulProcess"));
      },
      onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
      onFinally: () => handleCloseModal(),
    });
  };

  return (
    <BaseModal
      isOpenModal={openModal}
      closeModal={handleCloseModal}
      onCancel={handleCloseModal}
      onConfirm={() => {}}
      title="Subir una imagen"
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
        onFinish={() => {}}
        labelCol={{ span: 24 }}
      >
        <div className="layout-form-modal entity-200 entity-small">
          {loaderForm ? (
            <>
              <Spin tip={t("loading")} />
            </>
          ) : (
            <>
              <Row gutter={16} style={{ paddingTop: 10, marginTop: 10, borderRadius: 5 }}>
                <Col span={24}>
                  <Dragger {...props} onChange={onChange}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibit from uploading company data or other band
                      files
                    </p>
                  </Dragger>
                  ,
                </Col>
              </Row>
            </>
          )}
        </div>
      </Form>
    </BaseModal>
  );
};

ManageBucketModal.propTypes = {
  entityId: PropTypes.number,
  bucketId: PropTypes.number,
  setBucketId: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  refetch: PropTypes.func,
};

ManageBucketModal.defaultProps = {
  entityId: null,
  bucketId: null,
  refetch: () => {},
  setBucketId: () => {},
};

export default ManageBucketModal;
