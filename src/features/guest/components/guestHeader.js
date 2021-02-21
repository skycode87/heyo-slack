import { PageHeader, Tabs, Button, Statistic, Descriptions, Typography, Tooltip } from "antd";
import { useSelector } from "react-redux";

import { InfoCircleOutlined } from "@ant-design/icons";
import { numbers, globals, dateFormat } from "../../../constants/globals";

const { Link } = Typography;
const { TabPane } = Tabs;

const Header = ({ setPage, handleEdit, openDeleteModal, handleDetails, handleAssist, setSubpage, subpage, t }) => {
  const { currentGuest } = useSelector((store) => store.guest);

  const renderContent = (column = 3) => (
    <Descriptions size="small" column={column}>
      <Descriptions.Item label={t("documentType")}>{currentGuest?.documentType}</Descriptions.Item>
      <Descriptions.Item label={t("document")}>{currentGuest?.document}</Descriptions.Item>
      <Descriptions.Item label={t("email")}>{currentGuest?.email}</Descriptions.Item>
      <Descriptions.Item label={t("phone")}>{currentGuest?.phone}</Descriptions.Item>
      <Descriptions.Item label={t("birthdate")}>{dateFormat(currentGuest?.birthdate)}</Descriptions.Item>
      <Descriptions.Item label={t("category")}>{currentGuest?.category}</Descriptions.Item>
      <Descriptions.Item label={t("address")}>{currentGuest?.address}</Descriptions.Item>
      <Descriptions.Item label={t("city")}>{currentGuest?.city}</Descriptions.Item>
      <Descriptions.Item label={t("region")}>{currentGuest?.region}</Descriptions.Item>
      <Descriptions.Item label={t("country")}>{currentGuest?.country}</Descriptions.Item>
      <Descriptions.Item label={t("startdate")}>{dateFormat(currentGuest?.startdate)}</Descriptions.Item>
      <Descriptions.Item label={t("enddate")}>{dateFormat(currentGuest?.closuredate)}</Descriptions.Item>
      <Descriptions.Item label="Referido por">
        {currentGuest?.refererId ? (
          <Link href="#!" onClick={() => handleDetails({ _id: currentGuest?.refererId._id })}>
            {currentGuest?.refererId.firstname} {currentGuest?.refererId.lastname}
          </Link>
        ) : (
          "--"
        )}
      </Descriptions.Item>
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
        value={currentGuest?.active ? "Activo" : "Inactivo"}
        style={{
          marginRight: 70,
        }}
      />
      <Statistic
        title={t("plan")}
        value="Basico"
        style={{
          marginRight: 70,
        }}
      />
      <Statistic
        title={t("monthly")}
        prefix="$"
        value="100000"
        style={{
          marginRight: 70,
        }}
      />
      <Statistic
        title={t("type")}
        value={currentGuest?.type}
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
        title={`${currentGuest?.firstname} ${currentGuest?.lastname}`}
        subTitle="This is a subtitle"
        extra={[
          <Tooltip placement="topLeft" title="Prompt Text">
            <Button key="1" onClick={() => handleEdit(currentGuest)}>
              {t("edit")}
            </Button>{" "}
          </Tooltip>,
          <Tooltip placement="topLeft" title="Prompt Text">
            <Button key="3" onClick={() => openDeleteModal(currentGuest)}>
              {t("delete")}
            </Button>{" "}
          </Tooltip>,
          <Tooltip
            placement="topLeft"
            title={`Agregar un nuevo usuario referenciado por ${currentGuest?.firstname} ${currentGuest?.lastname}  `}
          >
            <Button
              key="5"
              style={{ background: "#cf8a02", border: "none" }}
              onClick={() => handleAssist(currentGuest)}
            >
              Asistencia
            </Button>
          </Tooltip>,
        ]}
        footer={
          <Tabs defaultActiveKey={subpage} onChange={callback}>
            <TabPane
              tab={
                <span>
                  <InfoCircleOutlined />
                  Asistencia
                </span>
              }
              key={numbers.ONE}
            />
            <TabPane
              tab={
                <span>
                  <InfoCircleOutlined />
                  {t("applications")}
                </span>
              }
              key={numbers.TWO}
            />
            <TabPane
              tab={
                <span>
                  <InfoCircleOutlined />
                  {t("payments")}
                </span>
              }
              key={numbers.THREE}
            />
          </Tabs>
        }
      >
        <Content extra={extraContent}>{renderContent()}</Content>
      </PageHeader>
    </>
  );
};

export default Header;
