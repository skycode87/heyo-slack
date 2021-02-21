import PropTypes from "prop-types";
import { Button } from "antd";

const PrimaryButton = ({ children, onClick, icon }) => (
  <Button onClick={onClick} type="primary" size="large" icon={icon}>
    {children}
  </Button>
);

PrimaryButton.propTypes = {
  children: PropTypes.node || PropTypes.string,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node,
};

export default PrimaryButton;
