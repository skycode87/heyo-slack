import { Breadcrumb } from "antd";

const BreadcrumbComponent = ({ goto }) => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <a onClick={() => goto()} href="#!">
        .
      </a>
    </Breadcrumb.Item>
  </Breadcrumb>
);

export default BreadcrumbComponent;
