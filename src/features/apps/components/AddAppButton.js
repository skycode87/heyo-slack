import { PlusOutlined } from "@ant-design/icons";
import PrimaryButton from "../../shared/components/PrimaryButton";
import useShortcut from "../../shared/hooks/useShortcut";

const AddAppButton = ({ isOpenManageAppsModal, openManageAppsModal, t }) => {
  useShortcut(["n"], openManageAppsModal, [isOpenManageAppsModal]);

  return (
    <>
      <PrimaryButton onClick={() => openManageAppsModal()} type="primary" size="large" icon={<PlusOutlined />}>
        {t("application")}
      </PrimaryButton>
    </>
  );
};
export default AddAppButton;
