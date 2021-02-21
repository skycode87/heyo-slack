import { Descriptions } from "antd";
import moment from "moment";

const InfoApp = ({ selectedApp }) => (
  <>
    <>
      <Descriptions size="small" column={4}>
        <Descriptions.Item label="Creado por">{selectedApp.rootId?.email}</Descriptions.Item>
        <Descriptions.Item label="Creado el ">00000000000</Descriptions.Item>
        <Descriptions.Item label="Ultima Edicion "> 00000000000</Descriptions.Item>
        <Descriptions.Item label="Editado por"> 00000000000</Descriptions.Item>
      </Descriptions>
    </>
  </>
);

export default InfoApp;
