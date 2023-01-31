import React from "react";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

import { useDispatch } from "react-redux";

import { userLocaService } from "../../services/localStorageService";
import { jiraServices } from "./../../services/jiraServices";

export default function Register(props) {
  let dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Success:", values);
    jiraServices
      .signUpJira(values)
      .then((res) => {
        // dispatch(res.data.content);
        console.log(res.data.content);

        // Lưu vào localStore
        userLocaService.set(res.data.content);
        // Chuyển hướng về trang chủ nhưng cần load trang :  window.location.href="/"

        //
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
      <div className="sm:container p-5">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <h1 className="text-center text-4xl">Register User Of CyberBugs</h1>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="passWord"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            label="PhoneNumber"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your Phone Number!",
              },
            ]}
          >
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              // offset: 12,
              span: 24,
            }}
            className="text-center"
          >
            <button className="btn btn-outline-secondary" htmlType="submit">
              Register
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
