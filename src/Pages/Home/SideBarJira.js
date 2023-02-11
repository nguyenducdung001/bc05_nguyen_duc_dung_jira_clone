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
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ALL_PROJECT_DROPDOWN_SAGA,
  OPEN_FORM_CREATE_TASK,
} from "../../redux/constant/jiraConstant";
import FormCreateTask from "./../../components/Forms/FormCreateTask/FormCreateTask";

const { Header, Sider, Content } = Layout;

export default function SideBarJira() {
  const dispatch = useDispatch();

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
        >
          <Menu.Item
            onClick={() => {
              dispatch({
                type: OPEN_FORM_CREATE_TASK,
                Component: <FormCreateTask />,
                title: "Create task",
              });
              dispatch({
                type: GET_ALL_PROJECT_DROPDOWN_SAGA,
              });
            }}
            key={1}
            icon={<PlusOutlined style={{ fontSize: "16px" }} />}
          >
            Create task
          </Menu.Item>
          <Menu.Item
            key={2}
            icon={<SearchOutlined style={{ fontSize: "16px" }} />}
          >
            Search
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
}
