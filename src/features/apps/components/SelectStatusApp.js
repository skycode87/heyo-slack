import { useState } from "react";
import { useSelector } from "react-redux";
import { Select, Form, Row, Col, Input } from "antd";
import BaseModal from "../../shared/components/Modal";
import useModal from "../../shared/hooks/useModal";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import { statusApp } from "../requests";

const { Option } = Select;
const { TextArea } = Input;

const initialData = { status: "", observation: "" };

const SelectStatusApp = ({ row, defaultValue }) => {
  const sessionStoreRedux = useSelector((store) => store.session);
  const [isOpenModal, openModal, closeModal] = useModal();
  const [form] = Form.useForm();
  const [data, setData] = useState(initialData);
  const handleChange = (value) => {
    setData({ ...data, status: value });
    openModal();
  };

  const handleCloseModal = () => {
    setData(initialData);
    closeModal();
  };

  const onFinish = (values) => {
    const dataxx = { ...data, ...values };
    statusApp(
      {
        ...row,
        ...dataxx,
        // appId: appId || "",
        rootId: sessionStoreRedux.currentSession._id,
      },
      {
        onSuccess: (response) => {
          setData(initialData);
          showGlobalNotification("success", "En Horabuena", "Registro Exitoso");
        },
        onError: () => showGlobalNotification("error", "Error", "error"),
        onFinally: () => handleCloseModal(),
      }
    );
  };

  const onValuesChange = (values) => {
    setData({ ...data, ...values });
  };
  return (
    <>
      <Select defaultValue={defaultValue} style={{ width: "100%" }} onChange={handleChange}>
        <Option value="Aprobada">Aprobada</Option>
        <Option value="Por confirmar">Por confirmar</Option>
        <Option value="Cancelada">Cancelada</Option>
      </Select>
      <BaseModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        onConfirm={() => form.submit()}
        onCancel={closeModal}
        isAlert="true"
        title="Actualizacion de Status"
        confirmText="Si"
        cancelText="No"
        footer
      >
        <Form
          size="small"
          layout="vertical"
          form={form}
          name="search-categories-form"
          // initialValues={initialValues}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
        >
          <Row gutter={24} style={{ padding: "10px 10px 10px 0px" }}>
            <Col span={24}>
              <h3>{data?.status}</h3>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name="observation" label="Información Adicional">
                <TextArea showCount="true" allowClear="true" defaultValue="" />
              </Form.Item>
            </Col>
          </Row>
        </Form>{" "}
      </BaseModal>
    </>
  );
};

export default SelectStatusApp;
