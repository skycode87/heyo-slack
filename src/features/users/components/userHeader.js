import { PageHeader, Tabs, Button, Statistic, Descriptions, Typography, Tooltip } from "antd";
import { PlusCircleOutlined, DeleteOutlined, EditOutlined, InfoCircleOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import { globals, numbers } from "../../../constants/globals";

const { Link } = Typography;
const { TabPane } = Tabs;

const Header = ({
  setPage,
  handleEdit,
  openDeleteModal,
  handleEditInvitation,
  handleDetails,
  handleAssist,
  handleGeneralModal,
  setSubpage,
  handleGuest,
  subpage,
  t,
}) => {
  const { currentUser } = useSelector((store) => store.user);

  const renderContent = (column = 3) => (
    <Descriptions size="small" column={column}>
      <Descriptions.Item label={t("documentType")}>{currentUser.documentType}</Descriptions.Item>
      <Descriptions.Item label={t("document")}>{currentUser.document}</Descriptions.Item>
      <Descriptions.Item label={t("email")}>{currentUser.email}</Descriptions.Item>
      <Descriptions.Item label={t("phone")}>{currentUser.phone}</Descriptions.Item>
      <Descriptions.Item label={t("birthdate")}>{currentUser.birthdate}</Descriptions.Item>
      <Descriptions.Item label={t("category")}>{currentUser.category}</Descriptions.Item>
      <Descriptions.Item label={t("address")}>{currentUser.address}</Descriptions.Item>
      <Descriptions.Item label={t("city")}>{currentUser.city}</Descriptions.Item>
      <Descriptions.Item label={t("region")}>{currentUser.region}</Descriptions.Item>
      <Descriptions.Item label={t("country")}>{currentUser.country}</Descriptions.Item>
      <Descriptions.Item label={t("startdate")}>{currentUser.startdate}</Descriptions.Item>
      <Descriptions.Item label={t("enddate")}>{currentUser.closuredate}</Descriptions.Item>
      <Descriptions.Item label={t("Referer By")}>
        {currentUser.refererId ? (
          <Link href="#!" onClick={() => handleDetails({ _id: currentUser.refererId._id })}>
            {currentUser.refererId.firstname} {currentUser.refererId.lastname}
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
        title={t("current status")}
        value={currentUser.active ? "Activo" : "Inactivo"}
        style={{
          marginRight: 70,
        }}
      />
      <Statistic
        title={t("basic")}
        style={{
          marginRight: 70,
        }}
      />
      <Statistic
        title={t("Monthly fee")}
        prefix="$"
        value="100000"
        style={{
          marginRight: 70,
        }}
      />
      <Statistic
        title={t("Type")}
        value={currentUser.type}
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
      {currentUser._id ? (
        <PageHeader
          avatar={{ src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4" }}
          className="site-page-header-responsive"
          onBack={() => setPage(globals.PAGE_MAIN)}
          title={`${currentUser.firstname} ${currentUser.lastname}`}
          subTitle="..."
          extra={[
            <Tooltip placement="topLeft" title="Prompt Text">
              <Button key="2" onClick={() => handleGuest(currentUser)}>
                <PlusCircleOutlined /> {t("guest")}
              </Button>{" "}
            </Tooltip>,
            <Tooltip
              placement="topLeft"
              title={`Agregar un nuevo usuario referenciado por ${currentUser.firstname} ${currentUser.lastname}  `}
            >
              <Button key="4" onClick={() => handleEditInvitation(currentUser)}>
                <PlusCircleOutlined /> {t("referer")}
              </Button>
            </Tooltip>,
            <Tooltip
              placement="topLeft"
              title={`Agregar un nuevo usuario referenciado por ${currentUser.firstname} ${currentUser.lastname}  `}
            >
              <Button key={numbers.TWO} onClick={() => handleAssist(currentUser)}>
                <PlusCircleOutlined /> Asistencia
              </Button>
            </Tooltip>,

            <Tooltip
              placement="topLeft"
              title={`Agregar un nuevo usuario referenciado por ${currentUser.firstname} ${currentUser.lastname}  `}
            >
              <Button key={numbers.FIVE} onClick={() => handleGeneralModal(currentUser)}>
                <PlusCircleOutlined /> {t("application")}
              </Button>
            </Tooltip>,
            <Tooltip placement="topLeft" title="Prompt Text">
              <Button key={numbers.ONE} onClick={() => handleEdit(currentUser)}>
                <EditOutlined /> {t("edit")}
              </Button>{" "}
            </Tooltip>,
            <Tooltip placement="topLeft" title="Prompt Text">
              <Button key={numbers.THREE} onClick={() => openDeleteModal(currentUser)}>
                <DeleteOutlined /> {t("delete")}
              </Button>{" "}
            </Tooltip>,
          ]}
          footer={
            <Tabs defaultActiveKey={subpage} onChange={callback}>
              <TabPane
                tab={
                  <>
                    <InfoCircleOutlined />
                    Asistencia
                  </>
                }
                key={numbers.ONE}
              />
              <TabPane
                tab={
                  <>
                    <InfoCircleOutlined />
                    {t("applications")}
                  </>
                }
                key={numbers.TWO}
              />
              <TabPane
                tab={
                  <>
                    <InfoCircleOutlined />
                    {t("payments")}
                  </>
                }
                key={numbers.THREE}
              />
              <TabPane
                tab={
                  <>
                    <InfoCircleOutlined />
                    {t("guests")}
                  </>
                }
                key={numbers.FOUR}
              />
            </Tabs>
          }
        >
          <Content extra={extraContent}>{renderContent()}</Content>
        </PageHeader>
      ) : (
        t("loading")
      )}
    </>
  );
};

export default Header;
