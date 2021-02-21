import { CloseCircleOutlined, SearchOutlined, IdcardOutlined, TableOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import globalStyles from "../../css/global.module.css";
import useShortcut from "../../hooks/useShortcut";
import useTranslate from "../../hooks/useTranslate";
import styles from "./ActionBar.module.css";

const ActionBar = ({
  children,
  options,
  filters,
  setContainerMode,
  containerMode,
  handleNewLinkModal,
  extraButtons = false,
  conditionalButton,
}) => {
  const { t } = useTranslate();
  const [searching, setSearching] = useState(false);
  const handleSearch = () => setSearching(!searching);

  useShortcut(["s"], () => setSearching(true), [searching]);

  return (
    <>
      {searching && children ? (
        <div className={`${globalStyles["padding-xs"]} ${styles["action-bar-content"]}`}>
          <Row justify="space-between" align="middle">
            <Col span={24}>{children}</Col>
          </Row>
          <CloseCircleOutlined onClick={handleSearch} className={styles["action-bar-close-close-button"]} />
        </div>
      ) : null}
      <Row className={`${globalStyles["padding-xs"]} ${styles["action-bar"]}`} justify="space-around" align="middle">
        <Col span={12}>{options && options?.actions && <options.actions filters={filters} />}</Col>
        <Col span={12} className={globalStyles["text-align-right"]}>
          <Space>
            {children && !searching ? (
              <Button className={styles["action-bar-button"]} icon={<SearchOutlined />} onClick={handleSearch}>
                {t["common.search"]}
              </Button>
            ) : null}
            {containerMode === "table" && (
              <Button
                style={{ background: "#1890ff" }}
                onClick={() => setContainerMode("cards")}
                shape="square"
                icon={<IdcardOutlined />}
                size="large"
              />
            )}
            {containerMode === "cards" && (
              <Button
                style={{ background: "#ff4d4f" }}
                onClick={() => setContainerMode("table")}
                shape="square"
                icon={<TableOutlined />}
                size="large"
              />
            )}
            {extraButtons && (
              <>
                {conditionalButton === "TEXT" && (
                  <Button
                    onClick={() => handleNewLinkModal("TEXT")}
                    shape="square"
                    icon={<TableOutlined />}
                    size="large"
                  >
                    Add Text
                  </Button>
                )}
                {conditionalButton === "IMAGE" && (
                  <>
                    <Button
                      onClick={() => handleNewLinkModal("IMAGE")}
                      shape="square"
                      icon={<TableOutlined />}
                      size="large"
                    >
                      Add Image
                    </Button>
                    <Button
                      onClick={() => handleNewLinkModal("URL_IMAGE")}
                      shape="square"
                      icon={<TableOutlined />}
                      size="large"
                    >
                      Add External Image
                    </Button>{" "}
                  </>
                )}

                {conditionalButton === "HTML" && (
                  <Button
                    onClick={() => handleNewLinkModal("HTML")}
                    shape="square"
                    icon={<TableOutlined />}
                    size="large"
                  >
                    Add Code
                  </Button>
                )}
                {conditionalButton === "LINK" && (
                  <Button
                    onClick={() => handleNewLinkModal("LINK")}
                    shape="square"
                    icon={<TableOutlined />}
                    size="large"
                  >
                    Add Link
                  </Button>
                )}
              </>
            )}
          </Space>
        </Col>
      </Row>
    </>
  );
};

ActionBar.propTypes = {
  children: PropTypes.node,
  options: PropTypes.object,
  filters: PropTypes.object,
  setContainerMode: PropTypes.func,
  containerMode: PropTypes.string,
  handleNewLinkModal: PropTypes.func,
  extraButtons: PropTypes.bool,
};

export default ActionBar;
