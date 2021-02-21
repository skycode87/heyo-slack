import { PlusOutlined } from "@ant-design/icons";
import PrimaryButton from "../../shared/components/PrimaryButton";
import ManageCategoriesModal from "./ManageCategoriesModal";
import useModal from "../../shared/hooks/useModal";
import useShortcut from "../../shared/hooks/useShortcut";

const AddCategoryButton = ({ refetch, initialValues, t }) => {
  const [isOpenManageCategoriesModal, openManageCategoriesModal, closeManageCategoriesModal] = useModal();

  useShortcut(["n"], openManageCategoriesModal, [isOpenManageCategoriesModal]);

  return (
    <>
      <PrimaryButton onClick={openManageCategoriesModal} type="primary" size="large" icon={<PlusOutlined />}>
        {t["setup.product.add.category"]}
      </PrimaryButton>
      <ManageCategoriesModal
        openModal={isOpenManageCategoriesModal}
        closeModal={closeManageCategoriesModal}
        initialValues={initialValues}
        refetch={refetch}
      />
    </>
  );
};

export default AddCategoryButton;
