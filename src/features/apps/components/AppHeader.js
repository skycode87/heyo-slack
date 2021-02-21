import { PageHeader, Tabs, Button, Statistic, Descriptions, Tooltip, Spin } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import { numbers, globals, dateFormat } from "../../../constants/globals";

const { TabPane } = Tabs;

const Header = ({ setPage, handleEdit, openDeleteModal, setSubpage, t }) => {
  const { currentApp } = useSelector((store) => store.app);

  const renderContent = (column = 4) => (
    <>
      <Descriptions size="small" column={column}>
        <Descriptions.Item label={t("category")}>{currentApp.planId?.category}</Descriptions.Item>
        <Descriptions.Item label={t("duration")}>{currentApp?.duration}</Descriptions.Item>
        <Descriptions.Item label={t("maximum")}>{currentApp.planId?.minLimit}</Descriptions.Item>
        <Descriptions.Item label={t("minimum")}>{currentApp.planId?.maxLimit}</Descriptions.Item>
        <Descriptions.Item label={t("startdate")}>{dateFormat(currentApp?.startdate)}</Descriptions.Item>
        <Descriptions.Item label={t("enddate")}>{dateFormat(currentApp?.closuredate)}</Descriptions.Item>
      </Descriptions>
      <Descriptions size="small" column={4}>
        <Descriptions.Item label={t("fullname")}>
          {currentApp.userId?.firstname} {currentApp.userId?.lastname}
        </Descriptions.Item>
        <Descriptions.Item label={t("documentType")}>{currentApp.userId?.documentType}</Descriptions.Item>
        <Descriptions.Item label={t("document")}>{currentApp.userId?.document}</Descriptions.Item>
        <Descriptions.Item label={t("email")}>{currentApp.userId?.email}</Descriptions.Item>
        <Descriptions.Item label={t("phone")}>{currentApp.userId?.phone}</Descriptions.Item>
        <Descriptions.Item label={t("birthdate")}>{dateFormat(currentApp.userId?.birthdate)}</Descriptions.Item>
        <Descriptions.Item label={t("address")}>{currentApp.userId?.address}</Descriptions.Item>
        <Descriptions.Item label={t("country")}>{currentApp.userId?.country}</Descriptions.Item>
        <Descriptions.Item label={t("region")}>{currentApp.userId?.region}</Descriptions.Item>
        <Descriptions.Item label={t("city")}>{currentApp.userId?.city}</Descriptions.Item>
        <Descriptions.Item label={t("observation")}>{currentApp.userId?.observation} </Descriptions.Item>
        <Descriptions.Item label={t("category")}>{currentApp.userId?.category}</Descriptions.Item>
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
        title={t("status")}
        value={currentApp?.active ? t("active") : t("inactive")}
        style={{
          marginRight: 70,
        }}
      />
      <Statistic
        title={t("private")}
        value={currentApp?.public ? t("public") : t("private")}
        style={{
          marginRight: 70,
        }}
      />
      <Statistic
        title={t("price")}
        prefix="$"
        value={currentApp.planId?.price}
        style={{
          marginRight: 70,
        }}
      />
      <Statistic
        title={t("type")}
        value={currentApp?.category}
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
      <Statistic title="Ultima Actualizacion" value={dateFormat(currentApp?.lastUpdatedAt)} />
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
      {currentApp._id ? (
        <PageHeader
          avatar={{ src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4" }}
          className="site-page-header-responsive"
          onBack={() => setPage(globals.PAGE_MAIN)}
          title={`${currentApp?.code}`}
          subTitle={`${currentApp.planId?.name} - ${currentApp.rootId?.email} `}
          extra={[
            <Tooltip placement="topLeft" title="Prompt Text">
              <Button key="1" onClick={() => handleEdit(currentApp)}>
                {t("edit")}
              </Button>
            </Tooltip>,
            <Tooltip placement="topLeft" title="Prompt Text">
              <Button key="3" onClick={() => openDeleteModal(currentApp)}>
                {t("delete")}
              </Button>
            </Tooltip>,
          ]}
          footer={
            <Tabs defaultActiveKey={numbers.ONE} onChange={callback}>
              <TabPane
                tab={
                  <span>
                    <InfoCircleOutlined />
                    {t("payment")}
                  </span>
                }
                key={numbers.ONE}
              />{" "}
              <TabPane
                tab={
                  <span>
                    <InfoCircleOutlined />
                    {t("event")}
                  </span>
                }
                key={numbers.TWO}
              />{" "}
              <TabPane
                tab={
                  <span>
                    <InfoCircleOutlined />
                    {t("pack")}
                  </span>
                }
                key={numbers.THREE}
              />
              <TabPane
                tab={
                  <span>
                    <InfoCircleOutlined />
                    Registro
                  </span>
                }
                key={numbers.FOUR}
              />
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
