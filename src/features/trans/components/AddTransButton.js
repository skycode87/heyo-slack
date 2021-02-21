import { PlusOutlined } from "@ant-design/icons";
import PrimaryButton from "../../shared/components/PrimaryButton";
import useShortcut from "../../shared/hooks/useShortcut";

const AddCategoryButton = ({ isOpenManageTranssModal, openManageTranssModal }) => {
  useShortcut(["n"], openManageTranssModal, [isOpenManageTranssModal]);

  return (
    <>
      <PrimaryButton onClick={openManageTranssModal} type="primary" size="large" icon={<PlusOutlined />}>
        Agregar Transaccion
      </PrimaryButton>
    </>
  );
};

export default AddCategoryButton;
