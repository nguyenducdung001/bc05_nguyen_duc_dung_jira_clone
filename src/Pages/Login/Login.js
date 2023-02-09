import React from "react";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

import { useDispatch, useSelector } from "react-redux";

import { userLocaService } from "../../services/localStorageService";
// import { useNavigate } from "react-router-dom";

import { jiraServices } from "./../../services/jiraServices";

export default function Login(props) {
  // let navigate = useNavigate();
  let user = useSelector((state) => {
    return state.JiraReducer.userInfor;
  });
  const getUserInfor = () => {
    console.log(user);
  };
  let dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Success:", values);
    jiraServices
      .signInJira(values)
      .then((res) => {
        // dispatch(res.data.content);
        console.log(res.data.content);
        dispatch({
          type: "userLogin",
          payload: res.data.content,
        });
        // Lưu vào localStore
        userLocaService.set(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 ">
      <div className="container p-5">
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
          <h1 className="text-center text-4xl">Login To Jira</h1>
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
            <Input size="large" prefix={<MailOutlined />} />
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
            <Input.Password size="large" prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              // offset: 12,
              span: 24,
            }}
            className="text-center"
          >
            <button
              className="btn btn-outline-primary w-100 mt-5"
              htmlType="submit"
            >
              Login
            </button>
          </Form.Item>
        </Form>
        <button className="btn btn-outline-primary" onClick={getUserInfor}>
          checkAPI
        </button>
      </div>
    </div>
  );
}
