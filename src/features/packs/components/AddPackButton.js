import { Button } from "antd";
import { PlusOutlined, TableOutlined, IdcardOutlined } from "@ant-design/icons";
import PrimaryButton from "../../shared/components/PrimaryButton";
import useShortcut from "../../shared/hooks/useShortcut";

const AddPackButton = ({ isOpenManagePacksModal, handleNew, t, containerMode, setContainerMode }) => {
  useShortcut(["n"], handleNew, [isOpenManagePacksModal]);

  return (
    <>
      <PrimaryButton onClick={handleNew} type="primary" size="large" icon={<PlusOutlined />}>
        {t("new")} {t("pack")}
      </PrimaryButton>
      {containerMode === "table" && (
        <Button onClick={() => setContainerMode("cards")} shape="square" icon={<IdcardOutlined />} size="large" />
      )}
      {containerMode === "cards" && (
        <Button onClick={() => setContainerMode("table")} shape="square" icon={<TableOutlined />} size="large" />
      )}
    </>
  );
};

export default AddPackButton;
