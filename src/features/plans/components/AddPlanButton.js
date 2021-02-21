import { useTranslation } from "react-i18next";

import { PlusOutlined } from "@ant-design/icons";
import PrimaryButton from "../../shared/components/PrimaryButton";
import useShortcut from "../../shared/hooks/useShortcut";

const AddCategoryButton = ({ isOpenManagePlansModal, openManagePlansModal, openManagePlanLinkModal }) => {
  useShortcut(["n"], openManagePlansModal, [isOpenManagePlansModal]);
  const { t } = useTranslation();

  return (
    <>
      <PrimaryButton onClick={openManagePlansModal} type="primary" size="large" icon={<PlusOutlined />}>
        {t("new")} {t("plan")}
      </PrimaryButton>
      <PrimaryButton onClick={openManagePlanLinkModal} type="primary" size="large" icon={<PlusOutlined />}>
        {t("new")} {t("link")}
      </PrimaryButton>
    </>
  );
};

export default AddCategoryButton;
