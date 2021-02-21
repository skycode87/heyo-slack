import { PlusOutlined } from "@ant-design/icons";
import PrimaryButton from "../../shared/components/PrimaryButton";
import ManageUserModal from "./ManageUserModal";
import useModal from "../../shared/hooks/useModal";
import useShortcut from "../../shared/hooks/useShortcut";

const AddUserButton = ({ refetch, initialValues, t }) => {
  const [isOpenManageUsersModal, openManageUsersModal, closeManageUsersModal] = useModal();

  useShortcut(["n"], openManageUsersModal, [isOpenManageUsersModal]);

  return (
    <>
      <PrimaryButton onClick={openManageUsersModal} type="primary" size="large" icon={<PlusOutlined />}>
        {t("add")} {t("customer")}
      </PrimaryButton>
      <ManageUserModal
        openModal={isOpenManageUsersModal}
        closeModal={closeManageUsersModal}
        initialValues={initialValues}
        refetch={refetch}
        t={t}
      />
    </>
  );
};

export default AddUserButton;
