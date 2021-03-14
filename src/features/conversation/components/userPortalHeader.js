import { PageHeader, Tabs, Button, Statistic, Descriptions, Typography, Tooltip } from "antd";

const { Link } = Typography;
const { TabPane } = Tabs;

const Header = ({ selectedUser, setPage, handleEdit, handleDetails, setSubpage }) => {
  const renderContent = (column = 3) => (
    <Descriptions size="small" column={column}>
      <Descriptions.Item label="Tipo Documento">{selectedUser.documentType}</Descriptions.Item>
      <Descriptions.Item label="Documento">{selectedUser.document}</Descriptions.Item>
      <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
      <Descriptions.Item label="Teléfono">{selectedUser.phone}</Descriptions.Item>
      <Descriptions.Item label="Nacimiento">{selectedUser.birthdate}</Descriptions.Item>
      <Descriptions.Item label="Dirección">{selectedUser.address}</Descriptions.Item>
      <Descriptions.Item label="Ciudad">{selectedUser.city}</Descriptions.Item>
      <Descriptions.Item label="Región">{selectedUser.region}</Descriptions.Item>
      <Descriptions.Item label="País">{selectedUser.country}</Descriptions.Item>
      <Descriptions.Item label="Fecha de Inicio">{selectedUser.startdate}</Descriptions.Item>
      <Descriptions.Item label="Fecha de Salida">{selectedUser.closuredate}</Descriptions.Item>
    </Descriptions>
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
        value={selectedUser.active ? "Activo" : "Inactivo"}
        style={{
          marginRight: 70,
        }}
      />
      <Statistic
        title="Plan"
        value="Basico"
        style={{
          marginRight: 70,
        }}
      />
      <Statistic
        title="Mensualidad"
        prefix="$"
        value="100000"
        style={{
          marginRight: 70,
        }}
      />
      <Statistic
        title="Tipo"
        value={selectedUser.type}
        style={{
          marginRight: 70,
        }}
      />
      <Statistic title="Ultima Visita" value="20/12/2020" />
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
      <PageHeader
        avatar={{ src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4" }}
        className="site-page-header-responsive"
        onBack={() => {}}
        title={`${selectedUser.firstname} ${selectedUser.lastname}`}
        subTitle=""
        extra={[
          <Tooltip placement="topLeft" title="Prompt Text">
            <Button key="2" type="primary">
              Agregar Pago
            </Button>{" "}
          </Tooltip>,
          <Tooltip placement="topLeft" title="Prompt Text">
            <Button key="1" onClick={() => handleEdit(selectedUser)}>
              Editar
            </Button>{" "}
          </Tooltip>,
        ]}
        footer={
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Pagos" key="1" />
            <TabPane tab="Invitaciones" key="2" />
            <TabPane tab="Referidos" key="3" />
          </Tabs>
        }
      >
        <Content extra={extraContent}>{renderContent()}</Content>
      </PageHeader>
    </>
  );
};

export default Header;
