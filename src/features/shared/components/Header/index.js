import { Layout, Menu, List, Avatar, Space } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";

const { Sider } = Layout;

const Head = ({ menu, setMenu, role }) => {
  const { currentSession } = useSelector((store) => store.session);
  const data = [
    {
      title: currentSession.firstname,
    },
  ];
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo">
        <h2> Heyo </h2>
        <List
          style={{ padding: 10, color: "#FFFFFF" }}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={currentSession.avatar} />}
                title={
                  <>
                    <p style={{ color: "#FFFFFF" }}>
                      {item.title} <br />
                      <Space>
                        <small>
                          <a href="#!" onClick={() => setMenu(11)}>
                            Profile
                          </a>
                        </small>
                        <small>
                          <a href="login/heyo">Sign out</a>
                        </small>
                      </Space>
                    </p>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </div>
      {role === "ADMIN" && (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[menu]}>
          <Menu.Item onClick={() => setMenu(2)} key="2" icon={<TeamOutlined />}>
            Users
          </Menu.Item>
          {/* <Menu.Item onClick={() => setMenu(11)} key="11" icon={<UserOutlined />}>
            Profile
      </Menu.Item>  */}
        </Menu>
      )}
      {role === "USER" && (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[menu]}>
          <Menu.Item onClick={() => setMenu(1)} key="1" icon={<UserOutlined />}>
            profile
          </Menu.Item>
        </Menu>
      )}
    </Sider>
  );
};

export default Head;
