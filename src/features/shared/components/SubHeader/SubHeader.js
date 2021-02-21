import PropTypes from "prop-types";
import { Col, Row } from "antd";
import styles from "./SubHeader.module.css";

const SubHeader = ({ children, title, primaryAction }) => (
  <div className={styles["sub-header"]}>
    <Row justify="space-between" align="middle">
      <Col span={12}>
        <h2 className={styles.title}>{title}</h2>
      </Col>
      <Col span={12} align="right">
        {primaryAction && primaryAction}
      </Col>
    </Row>
    {children && (
      <Row justify="start" className={styles.content}>
        <Col span={24}>{children}</Col>
      </Row>
    )}
  </div>
);

SubHeader.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  primaryAction: PropTypes.node,
};

export default SubHeader;
