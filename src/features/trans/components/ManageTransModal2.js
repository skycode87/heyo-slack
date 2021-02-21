import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash/debounce";

import { Form, Row, Col, Input, Select, Spin, message, Descriptions, InputNumber } from "antd";
import { saveTrans, getTrans } from "../requests";
import { getApp } from "../../apps/requests";

import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";
import SelectApps from "../../apps/components/SelectApps";
import { setTransRedux } from "../../../redux/trans";

const { Option } = Select;

const defaultValues = {
  appId: null,
  amount: 0,
  userId: null,
};

const ManageTransModal = ({ transId, setTransId, openModal, closeModal, refetch, t }) => {
  const dispatch = useDispatch();
  const sessionStoreRedux = useSelector((store) => store.session);

  const [selectedTrans, setSelectedTrans] = useState(defaultValues);
  const [form] = Form.useForm();
  const [loaderForm, setLoaderForm] = useState(false);
  const [mode, setMode] = useState(null);
  const [reload, setReload] = useState(0);

  const [isAppDetails, setIsAppDetails] = useState(false);

  const handleReset = () => {
    setSelectedTrans(defaultValues);
    setReload(Math.floor(Math.random() * 100000));
  };

  useEffect(() => {
    if (openModal) {
      if (transId) {
        setMode("edit");
      } else {
        setMode("new");
      }
    } else {
      handleReset();
      setMode(null);
      setTransId(null);
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
      getTrans(transId, {
        onSuccess: (response) => {
          setTransRedux(response.result)(dispatch);
          setSelectedTrans({
            ...response.result,
          });
          setLoaderForm(false);
        },
        onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
      });
    }
  }, [mode]);

  useEffect(() => {
    form.setFieldsValue(selectedTrans);
  }, [form, selectedTrans]);

  const handleCloseModal = () => {
    refetch();
    closeModal();
  };

  const onFinish = (values) => {
    const data = { ...selectedTrans, ...values };

    if (!data.appId) {
      message.error("This is an error message");
    } else {
      saveTrans(
        {
          ...data,
          appId: data.appId,
          transId,
          rootId: sessionStoreRedux.currentSession_id,
        },
        {
          onSuccess: (response) => {
            setSelectedTrans(response.result);
            showGlobalNotification("success", "En Horabuena", "Registro Exitoso");
          },
          onError: () => showGlobalNotification("error", "Error", "error"),
          onFinally: () => handleCloseModal(),
        }
      );
    }
  };

  const onValuesChange = debounce((values) => {
    if (values?.amount) {
      if (parseFloat(values.amount) <= parseFloat(selectedTrans.total)) {
        setSelectedTrans({ ...selectedTrans, ...values, pending: selectedTrans.total - values.amount });
      } else {
        setSelectedTrans({ ...selectedTrans, ...values, amount: selectedTrans.amount });
      }
    } else {
      setSelectedTrans({ ...selectedTrans, ...values });
    }
  }, 500);

  const handleSubmit = () => {
    form.validateFields().then(() => {
      form.submit();
    });
  };

  const handleApp = (value) => {
    setIsAppDetails(false);
    getApp(value, {
      onSuccess: (response) => {
        if (response.result.userId && response.result.packId) {
          setSelectedTrans({
            ...selectedTrans,
            appId: value,
            planId: response.result.planId,
            userId: response.result.userId,
            app: response.result,
            total: response.result.amount,
            amount: response.result.amount,
            fullname: `${response.result.userId.firstname} ${response.result.userId.lastname}`,
            email: `${response.result.userId.email}`,
            phone: `${response.result.userId.phone}`,
            pending: 0,
          });
        } else {
          message.error("Esta Aplicacion esta incompleta,  falta de usuario o un plan");
        }
      },
      onError: () => showGlobalNotification("error", "Error", "error"),
    });
  };

  useEffect(() => {
    console.log(selectedTrans);
  }, [selectedTrans]);

  return (
    <BaseModal
      isOpenModal={openModal}
      closeModal={handleCloseModal}
      onCancel={handleCloseModal}
      onConfirm={() => handleSubmit()}
      title={transId ? "Editar Trans" : "Nuevo Trans"}
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
        <div className="layout-form-modal entity-400 entity-small">
          {loaderForm ? (
            <>
              <Spin tip={t("loading")} />
            </>
          ) : (
            <>
              <Row gutter={15} style={{ paddingBottom: 10 }}>
                <Col span={24}>
                  <Form.Item name="packId2" tooltip="Firstname here pleaseio" label={t("applications")}>
                    <SelectApps
                      reload={reload}
                      currentValue={selectedTrans?.appId}
                      defaultValue={selectedTrans?.appId}
                      returnData={handleApp}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {selectedTrans.planId?._id && (
                <>
                  <Row gutter={15}>
                    <Descriptions size="small" column={4} style={{ marginBottom: 20 }}>
                      <Descriptions.Item label="Nombre">{selectedTrans.planId?.name}</Descriptions.Item>
                      <Descriptions.Item label="Duración">{selectedTrans.planId?.duration}</Descriptions.Item>
                      <Descriptions.Item label="Categoría">{selectedTrans.planId?.category}</Descriptions.Item>
                      <Descriptions.Item label="Precio">{selectedTrans.planId?.price}</Descriptions.Item>
                    </Descriptions>
                  </Row>

                  <Row gutter={15}>
                    <Col span={7}>
                      <Form.Item name="mode" label="Modalidad">
                        <Select disabled={!!transId} className="select-form-modal">
                          <Option value="Transferencia">Transferencia</Option>
                          <Option value="efectivo">Efectivo</Option>
                          <Option value="Debito">Debito</Option>
                          <Option value="Credito">Credito</Option>
                          <Option value="Otro">Otro</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item name="reference" label="Referencía">
                        <Input disabled={!!transId} value={selectedTrans?.reference} />
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item name="description" label="Descripción">
                        <Input value={selectedTrans?.description} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item name="fullname" label="Nombre Completo">
                        <Input disabled={!!transId} value={selectedTrans?.fullname} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="email" label="Email">
                        <Input disabled={!!transId} value={selectedTrans?.email} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="phone" label="Teléfono">
                        <Input disabled={!!transId} value={selectedTrans?.phone} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row
                    gutter={16}
                    style={{ backgroundColor: "#FFE79F", paddingTop: 10, marginTop: 10, borderRadius: 5 }}
                  >
                    <Col span={8}>
                      <Form.Item label="Monto a pagar" name="amount">
                        <InputNumber
                          disabled={!!transId}
                          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Queda debiendo" name="pending">
                        <InputNumber
                          disabled
                          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        />{" "}
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Total a Pagar" name="total">
                        <InputNumber
                          disabled
                          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}
            </>
          )}
        </div>
      </Form>
    </BaseModal>
  );
};

ManageTransModal.defaultProps = {
  setTransId: () => {},
};

export default ManageTransModal;
