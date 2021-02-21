import { useState } from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

const ActionsCalendarTable = ({ handleEdit, calendarId, handleDetails, handleArchived, handleInactive }) => {
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
      <Menu.Item onClick={() => handleDetails(calendarId)} key="1">
        Ir al Perfil
      </Menu.Item>
      <Menu.Item onClick={() => handleEdit(calendarId)} key="1">
        Editar
      </Menu.Item>
      <Menu.Item onClick={() => handleArchived(calendarId)} key="1">
        Eliminar
      </Menu.Item>
      <Menu.Item onClick={() => handleInactive(calendarId)} key="1">
        {calendarId.active ? (
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
        Opciones para {calendarId.name} <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default ActionsCalendarTable;
