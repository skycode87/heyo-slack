import { PlusOutlined } from "@ant-design/icons";
import PrimaryButton from "../../shared/components/PrimaryButton";
import ManageUserModal from "./ManageCalendarModal";
import useModal from "../../shared/hooks/useModal";
import useShortcut from "../../shared/hooks/useShortcut";

const AddCategoryButton = ({ refetch, initialValues, t }) => {
  const [isOpenManageUsersModal, openManageUsersModal, closeManageUsersModal] = useModal();

  useShortcut(["n"], openManageUsersModal, [isOpenManageUsersModal]);

  return (
    <>
      <PrimaryButton onClick={openManageUsersModal} type="primary" size="large" icon={<PlusOutlined />}>
        Agregar Nuevo
      </PrimaryButton>
      <ManageUserModal
        openModal={isOpenManageUsersModal}
        closeModal={closeManageUsersModal}
        initialValues={initialValues}
        refetch={refetch}
      />
    </>
  );
};

export default AddCategoryButton;
