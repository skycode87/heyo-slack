import { Button, Dropdown, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { exportCategoriesExcelFile } from "../requests";
import useTranslate from "../../shared/hooks/useTranslate";
import showGlobalNotification from "../../../helpers/showGlobalNotification";

const ActionsCategories = ({ filters }) => {
  const { t } = useTranslate();

  const actionsMenu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          exportCategoriesExcelFile(filters, {
            onError: () => showGlobalNotification("error", "Error", t["error.request.server.failed"]),
          });
        }}
      >
        {t["common.export.excel"]}
      </Menu.Item>
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
