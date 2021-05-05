import { useState, useEffect } from "react";
import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";

import HeaderComponent from "../features/shared/components/Header";
import FooterComponent from "../features/shared/components/Footer";
import UserContainer from "../features/home/containers/User";
import InstanceContainer from "../features/instance/containers/Instance";
import ProfileContainer from "../features/profile/containers/Profile";
import ConversationContainer from "../features/conversation/containers/Conversations";
import UsersContainer from "../features/users/containers/Users";

import { getUser, isLocalStorage } from "../utils/localStorage";
import { validateSessionUser, validateSessionRoot } from "../features/users/requests";
import { setSession } from "../redux/session";

const { Header, Content } = Layout;

const Home = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(2);
  const sessionStoreRedux = useSelector((store) => store.session);

  useEffect(() => {
    if (isLocalStorage()) {
      global.session = getUser();
      if (global.session.role === "USER") {
        validateSessionUser({
          onSuccess: (data) => {
            if (data.ok) {
              setSession(data.result)(dispatch);
            }
          },
        });
      }
      if (global.session.role === "ADMIN") {
        validateSessionRoot({
          onSuccess: (data) => {
            if (data.ok) {
              setSession(data.result)(dispatch);
            }
          },
        });
      }
    }
  }, []);

  return (
    <Layout>
      <HeaderComponent role={sessionStoreRedux.currentSession.role} menu={menu} setMenu={setMenu} />
      <Layout>
        <Header
          role={sessionStoreRedux.currentSession.role}
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        {sessionStoreRedux.currentSession.role === "ADMIN" && (
          <Content style={{ margin: "10px 16px 0" }}>
            <div className="site-layout-background" style={{ padding: 10, minHeight: 800 }}>
              {menu === 1 && <UserContainer />}
              {menu === 2 && <UsersContainer />}
              {menu === 3 && <ConversationContainer />}
              {menu === 10 && <InstanceContainer />}
              {menu === 11 && <ProfileContainer />}
            </div>
          </Content>
        )}
        <FooterComponent />
      </Layout>
    </Layout>
  );
};

export default Home;
