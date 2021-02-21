import { useState } from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

const ActionsPlanTable = ({ handleEdit, planId, handleDetails, handleArchived, handleInactive }) => {
  const [visible, setVisible] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === "3") {
      setVisible(false);
    }
  };

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item onClick={() => handleDetails(planId)} key="1">
        Ir al Perfil
      </Menu.Item>
      <Menu.Item onClick={() => handleEdit(planId)} key="1">
        Editar
      </Menu.Item>
      <Menu.Item onClick={() => handleArchived(planId)} key="1">
        Eliminar
      </Menu.Item>
      <Menu.Item onClick={() => handleInactive(planId)} key="1">
        {planId.active ? (
          <>
            <CloseCircleTwoTone twoToneColor="#FF0A50" />
            Desactivar{" "}
          </>
        ) : (
          <>
            <CheckCircleTwoTone twoToneColor="#52c41a" /> Activar
          </>
        )}
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} onVisibleChange={handleVisibleChange} visible={visible}>
      <a role="button" href="#!" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        Opciones para {planId.name} <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default ActionsPlanTable;
