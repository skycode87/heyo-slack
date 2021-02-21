import { useTranslation } from "react-i18next";
import { Tabs } from "antd";

// COMPONENTS
import ManageProfileForm from "../components/ManageProfileForm";
import ManagePasswordForm from "../components/ManagePasswordForm";

import InstanceHeader from "../components/profileHeader";

const { TabPane } = Tabs;

// HELPERS

// REDUX

// REQUEST

// CONSTANTS

const Instance = () => {
  const { t } = useTranslation();
  function callback(key) {
    console.log(key);
  }
  return (
    <>
      <InstanceHeader t={t} />
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Acerca de mi perfil" key="1">
          <ManageProfileForm />
        </TabPane>
        <TabPane tab="Cambiar Password" key="2">
          <ManagePasswordForm />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Instance;
