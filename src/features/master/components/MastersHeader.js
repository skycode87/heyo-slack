import { PageHeader, Button, Space } from "antd";

const Header = ({ primaryAction, handleGoBack, selectedMaster }) => (
  <>
    <PageHeader
      avatar={{ src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4" }}
      className="site-page-header-responsive"
      onBack={() => handleGoBack}
      title={selectedMaster.name ? <Space>Master / {selectedMaster.name}</Space> : <Space> Master </Space>}
      subTitle={
        selectedMaster.name && (
          <a href="#!" onClick={handleGoBack}>
            {" "}
            Volver a Master{" "}
          </a>
        )
      }
      extra={[primaryAction && primaryAction]}
    />
  </>
);

export default Header;
