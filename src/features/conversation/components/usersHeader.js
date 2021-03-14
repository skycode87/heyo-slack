import { PageHeader, Button } from "antd";

const Header = ({ primaryAction, t }) => (
  <>
    <PageHeader
      avatar={{ src: "http://assets.stickpng.com/images/5cb480cd5f1b6d3fbadece79.png" }}
      className="site-page-header-responsive"
      title="Slack Users"
      extra={[primaryAction && primaryAction]}
    />
  </>
);

export default Header;
