import { PageHeader, Tabs, Button, Statistic, Descriptions, Typography, Tooltip } from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  CloudUploadOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

import { useSelector } from "react-redux";
import { numbers, globals, priceFormat, dateFormat } from "../../../constants/globals";

const { Link } = Typography;
const { TabPane } = Tabs;

const Header = ({
  selectedPack,
  setPage,
  handleEdit,
  handleArchived,
  setSubpage,
  handleNewPlan,
  t,
  handleAddImage,
  handleEditContent,
}) => {
  const { currentPack } = useSelector((store) => store.pack);

  const renderContent = (column = 4) => <></>;

  const extraContent = (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          width: "max-content",
          justifyContent: "flex-end",
          paddingTop: 20,
        }}
      >
        <Statistic title={t("type")} value={currentPack?.type} className="size100" />
        <Statistic title={t("privacy")} value={currentPack.public ? t("public") : t("private")} className="size100" />
        <Statistic title={t("Type")} value={currentPack.category} className="size100" />
        <Statistic title={t("lastUpdatedAt")} className="size100" value={dateFormat(currentPack?.lastUpdatedAt)} />
        <Statistic className="size100" title={t("createdAt")} value={dateFormat(currentPack?.createdAt)} />
        <Statistic className="size100" title={t("lastUpdatedBy")} value={currentPack?.lastUpdatedBy || "---"} />
      </div>
      <div
        style={{
          display: "flex",
          width: "max-content",
          justifyContent: "flex-end",
          paddingTop: 20,
        }}
      >
        <Statistic className="size100" title={t("startdate")} value={dateFormat(currentPack?.startdate || "---")} />
        <Statistic title={t("closuredate")} value={dateFormat(currentPack?.closuredate)} className="size100" />
        <Statistic
          title={t("currentStatus")}
          value={currentPack.active ? t("active") : t("inactive")}
          className="size100"
        />
      </div>
    </>
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
      {currentPack._id ? (
        <PageHeader
          avatar={{ src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4" }}
          className="site-page-header-responsive"
          onBack={() => setPage(globals.PAGE_MAIN)}
          title={`${currentPack.name}`}
          subTitle="..."
          extra={[
            <Tooltip placement="topLeft" title="Prompt Text">
              <Button key="1" onClick={() => handleEdit(currentPack)}>
                <EditOutlined /> {t("edit")}
              </Button>{" "}
            </Tooltip>,
            <Tooltip placement="topLeft" title="Prompt Text">
              <Button key="3" onClick={() => handleArchived(currentPack)}>
                <DeleteOutlined /> {t("delete")}
              </Button>{" "}
            </Tooltip>,
            /* <Tooltip placement="topLeft" title="Prompt Text">
              <Button key="4" onClick={() => handleNewPlan(currentPack)}>
                <PlusCircleOutlined /> {t("plan")}
              </Button>{" "}
            </Tooltip>,
            <Tooltip placement="topLeft" title="Prompt Text">
              <Button key="4" onClick={() => handleAddImage(currentPack)}>
                <CloudUploadOutlined /> {t("image")}
              </Button>{" "}
            </Tooltip>,
            <Tooltip placement="topLeft" title="Prompt Text">
              <Button key="4" onClick={() => handleEditContent(currentPack)}>
                <EditOutlined /> {t("content")}
              </Button>{" "}
            </Tooltip>, */
          ]}
          footer={
            <Tabs defaultActiveKey={numbers.THREE} onChange={callback}>
              <TabPane
                tab={
                  <>
                    <DashboardOutlined />
                    {t("plans")}
                  </>
                }
                key={numbers.THREE}
              />
              <TabPane
                tab={
                  <>
                    <InfoCircleOutlined />
                    {t("calendar")}
                  </>
                }
                key={numbers.ONE}
              />
              <TabPane
                tab={
                  <>
                    <CloudUploadOutlined />
                    {t("upload")}
                  </>
                }
                key={numbers.TWO}
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
