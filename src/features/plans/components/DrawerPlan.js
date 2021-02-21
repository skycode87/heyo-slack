import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Drawer, Button, Descriptions } from "antd";
import { dateFormat, validateImage } from "../../../constants/globals";

const DrawerPlan = ({ isOpenDrawPlan, closeDrawPlan, selectedPlan }) => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  console.log(selectedPlan);

  return (
    <Drawer
      width="600"
      title={selectedPlan?.name}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={isOpenDrawPlan}
    >
      <Button type="primary" onClick={closeDrawPlan}>
        Close
      </Button>{" "}
      <br />
      <br />
      <Descriptions size="small" column={1} bordered>
        {selectedPlan?.name && <Descriptions.Item label="Nombre">{selectedPlan?.name}</Descriptions.Item>}
        {selectedPlan?.url && <Descriptions.Item label="Url">{selectedPlan?.url}</Descriptions.Item>}
        {selectedPlan?.type && <Descriptions.Item label="Tipo">{selectedPlan?.type}</Descriptions.Item>}
        {selectedPlan?.startdate && (
          <Descriptions.Item label="Desde">{dateFormat(selectedPlan?.startdate)}</Descriptions.Item>
        )}
        {selectedPlan?.closuredate && (
          <Descriptions.Item label="Hasta">{dateFormat(selectedPlan?.closuredate)}</Descriptions.Item>
        )}
        {selectedPlan?.rootId && (
          <Descriptions.Item label="createdBy">
            {selectedPlan?.rootId.firstname} {selectedPlan?.rootId.lastname} ( {selectedPlan?.rootId.login} )
          </Descriptions.Item>
        )}
        {selectedPlan?.body && (
          <Descriptions.Item label="Contenido">
            <code>{selectedPlan?.body}</code>
          </Descriptions.Item>
        )}

        {selectedPlan?.bodyResponsive && (
          <Descriptions.Item label="Contenido Responsive">
            <code>{selectedPlan?.bodyResponsive}</code>
          </Descriptions.Item>
        )}
      </Descriptions>
      {selectedPlan?.type === "IMAGE" && <img alt="ok" src={validateImage(selectedPlan.avatar)} />}
    </Drawer>
  );
};

export default DrawerPlan;
