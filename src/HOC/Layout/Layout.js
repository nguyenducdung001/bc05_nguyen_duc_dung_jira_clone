import React from "react";

import { Layout, Space } from "antd";
const { Header, Footer, Sider, Content } = Layout;

export default function Layouts({ children }) {
  const siderStyle = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundImage: "url(./img/bgLogin.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    // <div>
    //   <Header />
    //   {children}
    // </div>
    <Layout style={{ overflow: "hidden" }}>
      <Sider width={window.innerWidth / 2} style={siderStyle}></Sider>
      <Content>{children}</Content>
    </Layout>
  );
}
