import React from "react";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { userService } from "../../services/userService";
import { userLocaService } from "../../services/localStorageService";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  let navigate = useNavigate();
  let user = useSelector((state) => {
    return state.cyberBugReducer.userInfor;
  });
  const getUserInfor = () => {
    console.log(user);
  };
  let dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Success:", values);
    userService
      .postDangNhap(values)
      .then((res) => {
        // dispatch(res.data.content);
        console.log(res.data.content);
        dispatch({
          type: "userLogin",
          payload: res.data.content,
        });
        // Lưu vào localStore
        userLocaService.set(res.data.content);
        // Chuyển hướng về trang chủ nhưng cần load trang :  window.location.href="/"
        setTimeout(() => {
          // Dùng navigate để không cần load lại trang
          navigate("/");
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
          <h1 className="text-center text-4xl">Login To CyberBugs</h1>
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
            name="password"
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
              Login
            </Button>
          </Form.Item>
        </Form>
        <button
          onClick={getUserInfor}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          checkAPI
        </button>
      </div>
    </div>
  );
}
