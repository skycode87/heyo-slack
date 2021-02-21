import { PageHeader, Tabs, Button, Statistic, Descriptions, Typography, Tooltip } from "antd";

const { Link } = Typography;
const { TabPane } = Tabs;

const Header = ({ selectedPlan, setPage, handleEdit, openDeleteModal, setSubpage }) => {
  const renderContent = (column = 4) => (
    <Descriptions size="small" column={column}>
      <Descriptions.Item label="Categoria">{selectedPlan?.category}</Descriptions.Item>
      <Descriptions.Item label="Duracion">{selectedPlan?.duration}</Descriptions.Item>
      <Descriptions.Item label="Minimo">{selectedPlan?.minLimit}</Descriptions.Item>
      <Descriptions.Item label="Maximo">{selectedPlan?.maxLimit}</Descriptions.Item>
      <Descriptions.Item label="Fecha de Inicio">{selectedPlan?.startdate}</Descriptions.Item>
      <Descriptions.Item label="Fecha de Salida">{selectedPlan?.closuredate}</Descriptions.Item>
      {/* <Descriptions.Item label="Referido por">
        {selectedPlan?.refererId ? (
          <Link href="#!" onClick={() => handleDetails({ _id: selectedPlan?.refererId._id })}>
            {selectedPlan?.refererId.firstname} {selectedPlan?.refererId.lastname}
          </Link>
        ) : (
          "--"
        )}
        </Descriptions.Item> */}
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
        value={selectedPlan.active ? "Activo" : "Inactivo"}
        style={{
          marginRight: 70,
        }}
      />
      <Statistic
        title="Privacidad"
        value={selectedPlan.public ? "Publico" : "Privado"}
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
        value={selectedPlan.category}
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
        onBack={() => setPage("all")}
        title={`${selectedPlan.name}`}
        subTitle="This is a subtitle"
        extra={[
          <Tooltip placement="topLeft" title="Prompt Text">
            <Button key="1" onClick={() => handleEdit(selectedPlan)}>
              Editar
            </Button>{" "}
          </Tooltip>,
          <Tooltip placement="topLeft" title="Prompt Text">
            <Button key="3" onClick={() => openDeleteModal(selectedPlan)}>
              Eliminar
            </Button>{" "}
          </Tooltip>,
        ]}
        footer={
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Asistencia" key="1" />
            <TabPane tab="Pagos" key="2" />
            <TabPane tab="Invitaciones" key="3" />
            <TabPane tab="Referidos" key="4" />
          </Tabs>
        }
      >
        <Content extra={extraContent}>{renderContent()}</Content>
      </PageHeader>
    </>
  );
};

export default Header;
