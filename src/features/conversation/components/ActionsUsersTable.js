import { useState } from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

const ActionsUsersTable = ({ handleEdit, userId, handleDetails, handleArchived, handleInactive }) => {
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
      <Menu.Item onClick={() => handleDetails(userId)} key="1">
        Ir al Perfil
      </Menu.Item>
      <Menu.Item onClick={() => handleEdit(userId)} key="1">
        Editar
      </Menu.Item>
      <Menu.Item onClick={() => handleArchived(userId)} key="1">
        Eliminar
      </Menu.Item>
      <Menu.Item onClick={() => handleInactive(userId)} key="1">
        {userId.active ? (
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
        Opciones para {userId.firstname} <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default ActionsUsersTable;
