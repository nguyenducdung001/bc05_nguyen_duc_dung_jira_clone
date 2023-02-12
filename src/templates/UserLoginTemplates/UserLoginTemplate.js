import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { Layout, Space } from "antd";
import { Desktop, Mobile, Tablet } from "../../HOC/Responsive";

const { Header, Footer, Sider, Content } = Layout;

export const UserLoginTemplate = (props) => {
  const [{ width, height }, setSize] = useState({
    width: Math.round(window.innerWidth),
    height: Math.round(window.innerHeight),
  });

  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: Math.round(window.innerWidth),
        height: Math.round(window.innerHeight),
      });
    };
  }, []);

  let { Component, ...restRoute } = props;

  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <>
            <Layout>
              <Desktop>
                <Sider
                  width={width / 2}
                  style={{
                    height: height,
                    backgroundImage: `url(https://picsum.photos/${Math.round(
                      width / 2
                    )}/${height}`,
                    backgroundSize: "100%",
                  }}
                ></Sider>
              </Desktop>
              <Tablet></Tablet>
              <Mobile></Mobile>
              <Content>
                <Component {...propsRoute} />
              </Content>
            </Layout>
          </>
        );
      }}
    />
  );
};
