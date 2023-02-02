import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { OPEN_DRAWER } from "../redux/constant/jiraConstant";
import { CLOSE_DRAWER } from "./../redux/constant/jiraConstant";
const { Option } = Select;

export default function DrawerJira(props) {
  const { visible, ComponentContentDrawer, callBackSubmit, title } =
    useSelector((state) => state.DrawerJiraReducer);
  const dispatch = useDispatch();

  const showDrawer = () => {
    dispatch({ type: OPEN_DRAWER });
  };
  const onClose = () => {
    dispatch({ type: CLOSE_DRAWER });
  };
  return (
    <>
      {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button> */}
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        open={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {/* // Nội dung thay đổi của drawer */}
        {ComponentContentDrawer}
        {/* <ComponentContentDrawer /> */}
      </Drawer>
    </>
  );
}
