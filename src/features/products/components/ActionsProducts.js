import { Button, Dropdown, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import useTranslate from "../../shared/hooks/useTranslate";
import { exportProductsExcelFile } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";

const ActionsProducts = ({ filters }) => {
  const { t } = useTranslate();

  const actionsMenu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          exportProductsExcelFile(filters, {
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

export default ActionsProducts;
