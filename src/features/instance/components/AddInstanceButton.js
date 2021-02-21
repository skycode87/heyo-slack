import { PlusOutlined } from "@ant-design/icons";
import PrimaryButton from "../../shared/components/PrimaryButton";

const AddInstanceButton = ({ t }) => {
  console.log("");
  return (
    <>
      <PrimaryButton onClick={() => {}} type="primary" size="large">
        {t("update")}
      </PrimaryButton>
    </>
  );
};
export default AddInstanceButton;
