import { useTranslation } from "react-i18next";

// COMPONENTS
import ManageInstanceForm from "../components/ManageInstanceForm";
import InstanceHeader from "../components/InstanceHeader";

// HELPERS

// REDUX

// REQUEST

// CONSTANTS

const Instance = () => {
  const { t } = useTranslation();

  return (
    <>
      <InstanceHeader t={t} />
      <ManageInstanceForm />
    </>
  );
};

export default Instance;
