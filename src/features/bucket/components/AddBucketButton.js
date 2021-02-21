import { Button } from "antd";
import { PlusOutlined, TableOutlined, IdcardOutlined } from "@ant-design/icons";
import PrimaryButton from "../../shared/components/PrimaryButton";
import useShortcut from "../../shared/hooks/useShortcut";

const AddCategoryButton = ({ isOpenManageBucketsModal, openManageBucketsModal, setContainerMode, containerMode }) => {
  useShortcut(["n"], openManageBucketsModal, [isOpenManageBucketsModal]);

  return (
    <>
      <PrimaryButton onClick={openManageBucketsModal} type="primary" size="large" icon={<PlusOutlined />}>
        Imagen
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

export default AddCategoryButton;
