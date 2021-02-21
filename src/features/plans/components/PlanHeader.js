import { PageHeader, Tabs, Button, Statistic, Descriptions, Tooltip } from "antd";
import { InfoCircleOutlined, EditOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { numbers, globals, dateFormat, priceFormat } from "../../../constants/globals";

const { TabPane } = Tabs;

const Header = ({ handleAddImage, setPage, handleEdit, openDeleteModal, setSubpage, t, handleEditContent }) => {
  const { currentPlan } = useSelector((store) => store.plan);

  const renderContent = (column = 4) => (
    <Descriptions size="small" column={column}>
      <Descriptions.Item label={t("category")}>{currentPlan?.category}</Descriptions.Item>
      <Descriptions.Item label={t("duration")}>{currentPlan?.duration}</Descriptions.Item>
      <Descriptions.Item label={t("minimum")}>{currentPlan?.minLimit}</Descriptions.Item>
      <Descriptions.Item label={t("maximum")}>{currentPlan?.maxLimit}</Descriptions.Item>
      <Descriptions.Item label={t("stardate")}>{dateFormat(currentPlan?.startdate)}</Descriptions.Item>
      <Descriptions.Item label={t("enddate")}>{dateFormat(currentPlan?.closuredate)}</Descriptions.Item>
      <Descriptions.Item label={t("price")}>{priceFormat(currentPlan?.price)}</Descriptions.Item>
      <Descriptions.Item label={t("location")}>{currentPlan?.departurePlace}</Descriptions.Item>
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
        title={t("status")}
        value={currentPlan.active ? t("active") : t("inactive")}
        style={{
          marginRight: 70,
        }}
      />
      <Statistic
        title={t("monthly")}
        value={currentPlan.public ? t("public") : t("private")}
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
        value={currentPlan.category}
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
        onBack={() => setPage(globals.PAGE_MAIN)}
        title={`${currentPlan.name}`}
        subTitle="..."
        extra={[
          <Tooltip placement="topLeft" title="Prompt Text">
            <Button key="1" onClick={() => handleEdit(currentPlan)}>
              {t("edit")}
            </Button>
          </Tooltip>,
          <Tooltip placement="topLeft" title="Prompt Text">
            <Button key="3" onClick={() => openDeleteModal(currentPlan)}>
              {t("delete")}
            </Button>
          </Tooltip>,
          <Tooltip placement="topLeft" title="Prompt Text">
            <Button key="4" onClick={() => handleEditContent(currentPlan)}>
              <EditOutlined /> {t("content")}
            </Button>{" "}
          </Tooltip>,
          <Tooltip placement="topLeft" title="Prompt Text">
            <Button key="4" onClick={() => handleAddImage(currentPlan)}>
              <CloudUploadOutlined /> {t("image")}
            </Button>{" "}
          </Tooltip>,
        ]}
        footer={
          <Tabs defaultActiveKey={numbers.ONE} onChange={callback}>
            <TabPane
              key={numbers.TWO}
              tab={
                <>
                  <InfoCircleOutlined />
                  {t("applications")}
                </>
              }
            />
            <TabPane
              key={numbers.ONE}
              tab={
                <>
                  <InfoCircleOutlined />
                  {t("payments")}
                </>
              }
            />
            <TabPane
              key={numbers.THREE}
              tab={
                <>
                  <InfoCircleOutlined />
                  {t("upload")}
                </>
              }
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
