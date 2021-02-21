import { Button, Dropdown, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import useTranslate from "../../shared/hooks/useTranslate";

const ActionsCategories = ({ filters }) => {
  const { t } = useTranslate();

  const actionsMenu = (
    <Menu>
      <Menu.Item onClick={() => {}}>Excel</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={actionsMenu} trigger={["click"]} placement="bottomLeft" arrow>
      <Button className="ant-btn-actions">
        <MenuOutlined /> {t["common.actions"]}
      </Button>
    </Dropdown>
  );
};

export default ActionsCategories;
