import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Form, Row, Col, Input, Spin } from "antd";
import { saveMaster } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";

const ManageMasterModal = ({ getMaster, masterId, openModal, reset, closeModal, refetch, initialValues }) => {
  const [selectedMaster, setSelectedMaster] = useState(initialValues);
  const [form] = Form.useForm();
  const [requestData, setRequestData] = useState({});
  const [loaderForm, setLoaderForm] = useState(false);
  const masterStoreRedux_ = useSelector((store) => store.master);

  useEffect(() => {
    if (masterId) {
      setLoaderForm(true);
      getMaster(masterId, {
        onSuccess: (response) => {
          setSelectedMaster(response.result);
          setLoaderForm(false);
        },
        onError: () => showGlobalNotification("error", "Error", "error"),
      });
    } else {
      setSelectedMaster(initialValues);
    }
  }, [reset]);

  /*
  useEffect(() => {
    if (requestData.message) {
      closeModal();
      showGlobalNotification("success", "Exitooo", requestData.message);
      if (!masterId) setSelectedMaster(initialValues);
      refetch();
    }
  }, [requestData]);
*/
  useEffect(() => {
    form.setFieldsValue(selectedMaster);
  }, [form, selectedMaster]);

  const handleCloseModal = () => {
    refetch();
    closeModal();
  };

  const onFinish = (values) => {
    const data = { ...selectedMaster, ...values };
    saveMaster(
      {
        ...data,
        masterId: masterId || "",
        fatherId: masterStoreRedux_.currentMasterFather._id || "",
      },
      {
        onSuccess: (response) => {
          setRequestData(response);
          setSelectedMaster(response.result);
          if (masterId) {
            setSelectedMaster(initialValues);
          }
          showGlobalNotification("success", "En Horabuena", "Registro Exitoso");
        },
        onError: () => showGlobalNotification("error", "Error", "error"),
        onFinally: () => handleCloseModal(),
      }
    );
  };

  const onValuesChange = (values) => {
    setSelectedMaster({ ...selectedMaster, ...values });
  };

  const handleSubmit = () => {
    form.validateFields().then(() => {
      form.submit();
    });
  };

  return (
    <BaseModal
      isOpenModal={openModal}
      closeModal={handleCloseModal}
      onCancel={handleCloseModal}
      onConfirm={() => handleSubmit()}
      title={masterId ? "Edición" : "Agregar nuevo"}
      width={600}
      confirmText="Guardar"
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
        <div className="layout-form-modal entity-master">
          {loaderForm ? (
            <>
              <Spin tip="Cargando" />
            </>
          ) : (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    tooltip=""
                    label="Nombre del Setting"
                    rules={[
                      {
                        required: true,
                        message: `Por favor ingrese el nombre`,
                      },
                    ]}
                  >
                    <Input placeholder="" value={selectedMaster?.name} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="value" label="Valor del Setting">
                    <Input value={selectedMaster?.value} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="description" label="Descripción del Setting">
                    <Input value={selectedMaster?.description} />
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

/*
ManageUserModal.defaultProps = {
  setUserId: () => {},
};
*/
export default ManageMasterModal;
