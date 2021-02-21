import { useState, useEffect } from "react";
import { Row, Col, message, Card, Spin } from "antd";
import { withRouter } from "react-router-dom";
import Loginform from "../components/loginForm";
import showGlobalNotification from "../../../helpers/showGlobalNotification";

import "../signin.css";

import { login, loadBranding } from "../request";

const Login = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const [alias, setAlias] = useState(props.match.params.alias);
  const [setting, setSetting] = useState({});

  useEffect(() => {
    loadBranding(alias, {
      onSuccess: (response) => setSetting(response.result),
      onError: () => showGlobalNotification("error", "Error", "error"),
    });
  }, [alias]);

  useEffect(() => {
    console.log(setting);
  }, [setting]);

  return (
    <>
      {setting?._id ? (
        <Row>
          <Col span={8}>
            <div className="containerLogin">
              <Card
                cover={
                  <img alt="example" style={{ width: 100, margin: "auto", textAlign: "center" }} src={setting.logo} />
                }
                className="item"
                bordered={false}
                style={{ width: 350, paddingTop: 25 }}
              >
                <Loginform login={login} router={props} message={message} />
              </Card>
            </div>
          </Col>
          <Col
            span={16}
            style={{
              backgroundSize: "contain",
              minHeight: 700,
              backgroundImage: `url(${setting.background})`,
            }}
          />
        </Row>
      ) : (
        <p style={{ margin: "auto", maxWidth: 100, paddingTop: 200 }}>
          <Spin tip="Cargando ..." />
        </p>
      )}
    </>
  );
};

export default withRouter(Login);
