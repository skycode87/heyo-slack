import { PageHeader, Tabs, Button, Statistic, Descriptions, Typography, Tooltip, Spin, Alert, Collapse } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const { Link } = Typography;
const { TabPane } = Tabs;

const Header = ({ selectedCalendar, setPage, handleEdit, openDeleteModal, setSubpage }) => {
  const { planId, packId } = selectedCalendar;
  const { Panel } = Collapse;

  const renderContent = (column = 4) => (
    <>
      <Descriptions size="small" column={column}>
        <Descriptions.Item label="Categoria">{selectedCalendar.planId?.category}</Descriptions.Item>
        <Descriptions.Item label="Duracion">{planId?.duration}</Descriptions.Item>
        <Descriptions.Item label="Minimo">{selectedCalendar.planId?.minLimit}</Descriptions.Item>
        <Descriptions.Item label="Maximo">{selectedCalendar.planId?.maxLimit}</Descriptions.Item>
        <Descriptions.Item label="Fecha de Inicio">{moment(selectedCalendar?.startdate).format("l")}</Descriptions.Item>
        <Descriptions.Item label="Fecha de Salida">
          {moment(selectedCalendar?.closuredate).format("l")}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions size="small" column={4}>
        <Descriptions.Item label="Nombre Completo">
          {selectedCalendar.userId?.firstname} {selectedCalendar.userId?.lastname}
        </Descriptions.Item>
        <Descriptions.Item label="Tipo de Documento">{selectedCalendar.userId?.documentType}</Descriptions.Item>
        <Descriptions.Item label="Documento">{selectedCalendar.userId?.document}</Descriptions.Item>
        <Descriptions.Item label="Email">{selectedCalendar.userId?.email}</Descriptions.Item>
        <Descriptions.Item label="Teléfono">{selectedCalendar.userId?.phone}</Descriptions.Item>
        <Descriptions.Item label="Fecha de Nacimiento">
          {moment(selectedCalendar.userId?.birthdate).format("l")}
        </Descriptions.Item>
        <Descriptions.Item label="Dirección">{selectedCalendar.userId?.address}</Descriptions.Item>
        <Descriptions.Item label="País">{selectedCalendar.userId?.country}</Descriptions.Item>
        <Descriptions.Item label="Región">{selectedCalendar.userId?.region}</Descriptions.Item>
        <Descriptions.Item label="Ciudad">{selectedCalendar.userId?.city}</Descriptions.Item>
        <Descriptions.Item label="Observación">{selectedCalendar.userId?.observation} </Descriptions.Item>
        <Descriptions.Item label="Categoría">{selectedCalendar.userId?.category}</Descriptions.Item>
      </Descriptions>
    </>
  );

  const extraContent = (
    <div
      style={{
        display: "flex",
        width: "max-content",
        justifyContent: "flex-end",
        paddingTop: 20,
      }}
    >
      <Statistic
        title="Estado Actual"
        value={selectedCalendar?.active ? "Activo" : "Inactivo"}
        style={{
          marginRight: 70,
        }}
      />
      <Statistic
        title="Privacidad"
        value={selectedCalendar?.public ? "Publico" : "Privado"}
        style={{
          marginRight: 70,
        }}
      />
      <Statistic
        title="Precio"
        prefix="$"
        value={selectedCalendar.planId?.price}
        style={{
          marginRight: 70,
        }}
      />
      <Statistic
        title="Tipo"
        value={selectedCalendar?.category}
        style={{
          marginRight: 70,
        }}
      />
      <Statistic
        title="Ultima Visita"
        value="20/12/2020"
        style={{
          marginRight: 70,
        }}
      />
      <Statistic title="Ultima Actualizacion" value={moment(selectedCalendar?.lastUpdatedAt).format("l")} />
    </div>
  );

  const Content = ({ children, extra }) => (
    <div className="content">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );

  const callback = (key) => {
    setSubpage(key);
  };

  return (
    <>
      {selectedCalendar._id ? (
        <PageHeader
          avatar={{ src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4" }}
          className="site-page-header-responsive"
          onBack={() => setPage("all")}
          title={`${selectedCalendar?.code}`}
          subTitle={`${selectedCalendar.planId?.name} - ${selectedCalendar.rootId?.email} `}
          extra={[
            <Tooltip placement="topLeft" title="Prompt Text">
              <Button key="1" onClick={() => handleEdit(selectedCalendar)}>
                Editar
              </Button>{" "}
            </Tooltip>,
            <Tooltip placement="topLeft" title="Prompt Text">
              <Button key="3" onClick={() => openDeleteModal(selectedCalendar)}>
                Eliminar
              </Button>{" "}
            </Tooltip>,
          ]}
          footer={
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane
                tab={
                  <span>
                    <InfoCircleOutlined />
                    Pagos
                  </span>
                }
                key="1"
              />{" "}
              <TabPane
                tab={
                  <span>
                    <InfoCircleOutlined />
                    Evento
                  </span>
                }
                key="2"
              />{" "}
              <TabPane
                tab={
                  <span>
                    <InfoCircleOutlined />
                    Paquete
                  </span>
                }
                key="3"
              />
              <TabPane
                tab={
                  <span>
                    <InfoCircleOutlined />
                    Registro
                  </span>
                }
                key="4"
              />{" "}
            </Tabs>
          }
        >
          <Content extra={extraContent}>{renderContent()}</Content>
        </PageHeader>
      ) : (
        <Spin className="spin-global" />
      )}
    </>
  );
};

export default Header;
