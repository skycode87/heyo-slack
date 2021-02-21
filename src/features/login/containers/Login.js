import { useState, useEffect } from "react";
import { Row, Col, message, Card, Spin } from "antd";
import { withRouter } from "react-router-dom";
import Loginform from "../components/loginForm";
import showGlobalNotification from "../../../helpers/showGlobalNotification";

import "../login.css";

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
                  <img
                    alt="example"
                    style={{ width: 100, margin: "auto", textAlign: "center" }}
                    src="https://ca.slack-edge.com/T6LENHUDD-U01KT6PK1K8-a21137e6f692-512"
                  />
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
              backgroundSize: "100% 100%",
              minHeight: 600,
              backgroundImage: `url("https://a.slack-edge.com/b3ea4/marketing/img/features/slack-connect/unfurl/unfurl.jpg")`,
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
