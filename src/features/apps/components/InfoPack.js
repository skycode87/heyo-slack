import { Descriptions } from "antd";
import moment from "moment";

const InfoApp = ({ selectedApp }) => (
  <>
    <>
      <Descriptions size="small" column={4}>
        <Descriptions.Item label="Nombre">{selectedApp.packId?.name}</Descriptions.Item>

        <Descriptions.Item label="Categoria">{selectedApp.packId?.category}</Descriptions.Item>
        <Descriptions.Item label="departurePlace">{selectedApp.packId?.departurePlace}</Descriptions.Item>
        <Descriptions.Item label="Duracion">{selectedApp.packId?.duration}</Descriptions.Item>
        <Descriptions.Item label="Minimo">{selectedApp.packId?.minLimit}</Descriptions.Item>
        <Descriptions.Item label="Precio Base">{selectedApp.packId?.price}</Descriptions.Item>
        <Descriptions.Item label="Duracion">{selectedApp.packId?.public ? "Publico" : "Privado"}</Descriptions.Item>
        <Descriptions.Item label="Maximo">{selectedApp.packId?.maxLimit}</Descriptions.Item>
        <Descriptions.Item label="Tags">{selectedApp.packId?.tag}</Descriptions.Item>
        <Descriptions.Item label="Creado el">{selectedApp.packId?.createdAt}</Descriptions.Item>
      </Descriptions>
    </>
  </>
);

export default InfoApp;
