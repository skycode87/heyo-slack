import { PlusOutlined } from "@ant-design/icons";
import PrimaryButton from "../../shared/components/PrimaryButton";
import useTranslate from "../../shared/hooks/useTranslate";
import ManageMasterModal from "./ManageMasterModal";
import useModal from "../../shared/hooks/useModal";
import useShortcut from "../../shared/hooks/useShortcut";

const AddMasterButton = ({ refetch, initialValues, selectedMaster }) => {
  const { t } = useTranslate();
  const [isOpenManageMastersModal, openManageMastersModal, closeManageMastersModal] = useModal();

  useShortcut(["n"], openManageMastersModal, [isOpenManageMastersModal]);

  return (
    <>
      <PrimaryButton onClick={openManageMastersModal} type="primary" size="large" icon={<PlusOutlined />}>
        {" Nuevo "}
        {selectedMaster.name ? selectedMaster.name : "Master"}
      </PrimaryButton>
      <ManageMasterModal
        openModal={isOpenManageMastersModal}
        closeModal={closeManageMastersModal}
        initialValues={initialValues}
        refetch={refetch}
      />
    </>
  );
};

export default AddMasterButton;
