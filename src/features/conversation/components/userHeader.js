import { PageHeader, Button } from "antd";

const Header = ({ primaryAction, t }) => (
  <>
    <PageHeader
      avatar={{ src: "https://ca.slack-edge.com/T6LENHUDD-U01KT6PK1K8-a21137e6f692-512" }}
      className="site-page-header-responsive"
      title="Slack Conversations"
      extra={[primaryAction && primaryAction]}
    />
  </>
);

export default Header;
