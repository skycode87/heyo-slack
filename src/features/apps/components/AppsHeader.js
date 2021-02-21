import { PageHeader } from "antd";

const Header = ({ primaryAction, t }) => (
  <>
    <PageHeader
      avatar={{ src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4" }}
      className="site-page-header-responsive"
      onBack={() => {}}
      title={t("applications")}
      subTitle="..."
      extra={[primaryAction && primaryAction]}
    />
  </>
);

export default Header;
