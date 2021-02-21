import { Modal } from "antd";
import PropTypes from "prop-types";
import "./BaseModal.css";

const BaseModal = ({
  children,
  isOpenModal,
  closeModal,
  onConfirm,
  onCancel,
  title,
  confirmText,
  cancelText,
  width,
  isCloseModal,
  top,
  isAlert,
}) => (
  <Modal
    title={title}
    visible={isOpenModal}
    maskClosable="true"
    onOk={() => {
      onConfirm();
      if (!isCloseModal) closeModal();
    }}
    onCancel={() => {
      onCancel();
      closeModal();
    }}
    okText={confirmText}
    cancelText={cancelText}
    className={isAlert ? "ant-modal-alert" : ""}
    width={width}
    style={{ top }}
  >
    {children}
  </Modal>
);

BaseModal.propTypes = {
  children: PropTypes.node,
  isOpenModal: PropTypes.bool,
  closeModal: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  width: PropTypes.number,
  isCloseModal: PropTypes.bool,
  top: PropTypes.number,
  isAlert: PropTypes.bool,
};

BaseModal.defaultProps = {
  width: 400,
  top: 100,
  isAlert: false,
};

export default BaseModal;
