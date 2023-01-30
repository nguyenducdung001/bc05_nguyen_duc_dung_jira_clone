import React from "react";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

import { useDispatch } from "react-redux";
import { userService } from "../../services/userService";
import { userLocaService } from "../../services/localStorageService";
import { useNavigate } from "react-router-dom";
export default function Register(props) {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Success:", values);
    userService
      .postDangKi(values)
      .then((res) => {
        // dispatch(res.data.content);
        console.log(res.data.content);

        // Lưu vào localStore
        userLocaService.set(res.data.content);
        // Chuyển hướng về trang chủ nhưng cần load trang :  window.location.href="/"
        setTimeout(() => {
          // Dùng navigate để không cần load lại trang
          navigate("/login");
        }, 1000);
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
    <div className="flex flex-col justify-center items-center w-screen h-screen">
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
            <Button
              className="bg-green-400 text-white hover:bg-white"
              htmlType="submit"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
