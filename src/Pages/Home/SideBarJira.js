import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";

const { Header, Sider, Content } = Layout;

export default function SideBarJira() {
  const [state, setState] = useState({ collapsed: false });
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={state.collapsed}>
        <div className="text-right" onClick={toggle}>
          <MenuOutlined
            style={{ color: "#fff", cursor: "pointer", fontSize: "25px" }}
          />
        </div>
        <div className="logo" />
        <Menu
          style={{ fontSize: "16px" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <PlusOutlined style={{ fontSize: "16px" }} />,
              label: "Creata issue",
            },
            {
              key: "2",
              icon: <SearchOutlined style={{ fontSize: "16px" }} />,
              label: "Search",
            },
          ]}
        />
      </Sider>
    </Layout>
  );
}
