import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";

import { Form, Row, Col, Input, Select, Spin, Divider, Switch, Typography, Descriptions } from "antd";
import { saveTrans } from "../requests";
import { getApp } from "../../apps/requests";

import showGlobalNotification from "../../../helpers/showGlobalNotification";
import BaseModal from "../../shared/components/Modal/BaseModal";
import SelectApps from "../../apps/components/SelectApps";

const moment = require("moment");

const { TextArea } = Input;

const { Title, Link } = Typography;

const { Option } = Select;

const ManageTransModal = ({
  getTrans,
  transId,
  openModal,
  closeModal,
  refetch,
  initialValues,
  setSelectedTransMain,
  selectedApp,
  selectedTransMain,
}) => {
  const [selectedTrans, setSelectedTrans] = useState(initialValues);
  const [form] = Form.useForm();
  const [requestData, setRequestData] = useState({});
  const [loaderForm, setLoaderForm] = useState(false);
  const sessionStoreRedux = useSelector((store) => store.session);

  useEffect(() => {
    if (transId) {
      setLoaderForm(true);
      // eslint-disable-next-line no-unused-expressions
      !selectedApp &&
        getTrans(transId, {
          onSuccess: (response) => {
            setSelectedTrans(response.result);
            setLoaderForm(false);
          },
          onError: () => showGlobalNotification("error", "Error", "error"),
        });
    } else {
      setSelectedTrans(initialValues);
    }
  }, [transId]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
    if (selectedApp && selectedApp?._id) {
      setLoaderForm(true);
      getApp(selectedApp._id, {
        onSuccess: (response) => {
          setSelectedTrans({
            ...selectedTrans,
            appId: selectedApp._id,
            app: response.result,
            total: response.result.amount,
            amount: response.result.amount,
            fullname: `${response.result.userId.firstname} ${response.result.userId.lastname}`,
            email: `${response.result.userId.email}`,
            phone: `${response.result.userId.phone}`,
            pending: 0,
          });
          setLoaderForm(false);
        },
        onError: () => showGlobalNotification("error", "Error", "error"),
      });
    }
  }, [openModal]);

  useEffect(() => {
    if (requestData.message) {
      closeModal();
      showGlobalNotification("success", "Exitooo", requestData.message);
      if (!transId) setSelectedTrans(initialValues);
      refetch();
    }
  }, [requestData]);

  useEffect(() => {
    setSelectedTrans(selectedTransMain);
  }, [selectedTransMain]);

  const handleCloseModal = () => {
    refetch();
    closeModal();
  };

  useEffect(() => {
    console.log(selectedApp);
  }, [selectedApp]);

  useEffect(() => {
    console.log(selectedTrans);
  }, [selectedTrans]);

  const handleSubmit = () => {
    form.validateFields().then(() => {
      form.submit();
    });
  };

  const handleApp = (appId) => {
    setLoaderForm(true);
    getApp(appId, {
      onSuccess: (response) => {
        setSelectedTrans({
          ...selectedTrans,
          appId,
          app: response.result,
          total: response.result.amount,
          amount: response.result.amount,
          fullname: `${response.result.userId.firstname} ${response.result.userId.lastname}`,
          email: `${response.result.userId.email}`,
          phone: `${response.result.userId.phone}`,
          pending: 0,
        });
        setLoaderForm(false);
      },
      onError: () => showGlobalNotification("error", "Error", "error"),
    });
  };

  return (
    <BaseModal
      isOpenModal={openModal}
      closeModal={handleCloseModal}
      onCancel={handleCloseModal}
      onConfirm={handleCloseModal}
      title="Más detalles de la transacción"
      width={1000}
      confirmText=""
      isCloseModal
      top={70}
    >
      <div className="layout-form-modal entity-300 entity-small">
        {loaderForm ? (
          <>
            <Spin tip="Cargando" />
          </>
        ) : (
          <>
            <Row gutter={15}>
              <Divider orientation="left">Acerca de la transacción</Divider>

              <Descriptions size="small" column={3} style={{ marginBottom: 20 }}>
                <Descriptions.Item label="Descripcion">{selectedTrans?.description}</Descriptions.Item>
                <Descriptions.Item label="Codigo">{selectedTrans?.code}</Descriptions.Item>
                <Descriptions.Item label="Fecha">{selectedTrans?.createAt}</Descriptions.Item>
                <Descriptions.Item label="Nombre">{selectedTrans?.fullname}</Descriptions.Item>
                <Descriptions.Item label="Email">{selectedTrans?.email}</Descriptions.Item>
                <Descriptions.Item label="Phone">{selectedTrans?.phone}</Descriptions.Item>
                <Descriptions.Item label="Tipo">{selectedTrans?.type}</Descriptions.Item>
                <Descriptions.Item label="Estatus">{selectedTrans?.status}</Descriptions.Item>
                <Descriptions.Item label="Realizada por">{selectedTrans.rootId?.email}</Descriptions.Item>
              </Descriptions>
              <Descriptions size="small" column={3} style={{ marginBottom: 20 }}>
                <Descriptions.Item label="Monto">{selectedTrans?.amount}</Descriptions.Item>
                <Descriptions.Item label="Pendiente">{selectedTrans?.pending}</Descriptions.Item>
                <Descriptions.Item label="Total">{selectedTrans?.total}</Descriptions.Item>
              </Descriptions>
            </Row>
            <Row gutter={15}>
              <Divider orientation="left">Acerca del Plan</Divider>

              <Descriptions size="small" column={3} style={{ marginBottom: 20 }}>
                <Descriptions.Item label="Plan">{selectedTrans.planId?.name}</Descriptions.Item>
                <Descriptions.Item label="Costo">{selectedTrans.planId?.price}</Descriptions.Item>

                <Descriptions.Item label="Duración">{selectedTrans.planId?.duration}</Descriptions.Item>
              </Descriptions>
            </Row>
          </>
        )}
      </div>
    </BaseModal>
  );
};

ManageTransModal.defaultProps = {
  setTransId: () => {},
};

export default ManageTransModal;
