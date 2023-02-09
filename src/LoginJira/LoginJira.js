import React from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Input, Button } from "antd";
import { withFormik } from "formik";
import { USER_SIGNIN_API } from "./../redux/constant/jiraConstant";
import { signInAction } from "../redux/action/JiraAction";

function LoginJira(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  return (
    <form
      onSubmit={handleSubmit}
      className="container"
      style={{ height: window.innerHeight }}
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h1 className="display-4" style={{ fontWeight: "300" }}>
          Login Jira
        </h1>
        <div className="d-flex flex-column mt-5 w-50">
          <Input
            onChange={handleChange}
            name="email"
            size="large"
            placeholder="Email"
            prefix={<UserOutlined />}
          />
        </div>
        <div className="text-danger">{errors.email}</div>
        <div className="d-flex flex-column mt-3 w-50">
          <Input.Password
            onChange={handleChange}
            name="passWord"
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
          />
        </div>
        <div className="text-danger">{errors.passWord}</div>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="mt-5 w-50"
        >
          Login
        </Button>
      </div>
    </form>
  );
}

const LoginJiraWithFormik = withFormik({
  mapPropsToValues: () => ({ email: "", passWord: "" }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("email is invalid!"),
    passWord: Yup.string()
      .min(6, "At least 6 character")
      .max(32, "No more 32 character"),
  }),

  handleSubmit: ({ email, passWord }, { props, setSubmitting }) => {
    props.dispatch(signInAction(email, passWord));
  },

  displayName: "LoginJira",
})(LoginJira);

export default connect(null)(LoginJiraWithFormik);
