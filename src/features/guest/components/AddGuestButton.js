import { PlusOutlined } from "@ant-design/icons";
import PrimaryButton from "../../shared/components/PrimaryButton";
import useShortcut from "../../shared/hooks/useShortcut";

const AddCategoryButton = ({ t, isOpenManageGuestsModal, openManageGuestsModal }) => {
  useShortcut(["n"], openManageGuestsModal, [isOpenManageGuestsModal]);

  return (
    <>
      <PrimaryButton onClick={openManageGuestsModal} type="primary" size="large" icon={<PlusOutlined />}>
        {t("add")} {t("guest")}
      </PrimaryButton>
    </>
  );
};

export default AddCategoryButton;
