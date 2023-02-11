import React from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Input, Button } from "antd";
import { withFormik } from "formik";
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { registerAction } from "../redux/action/JiraAction";
import { NavLink } from "react-router-dom";

function RegisterJira(props) {
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
          Register Jira
        </h1>
        <div className="d-flex flex-column mt-5 w-50">
          <Input
            onChange={handleChange}
            name="email"
            size="large"
            placeholder="Email"
            prefix={<MailOutlined />}
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

        <div className="d-flex flex-column mt-3 w-50">
          <Input
            onChange={handleChange}
            name="name"
            size="large"
            placeholder="Name"
            prefix={<UserOutlined />}
          />
        </div>
        <div className="text-danger">{errors.name}</div>
        <div className="d-flex flex-column mt-3 w-50">
          <Input
            onChange={handleChange}
            name="phoneNumber"
            size="large"
            placeholder="Phone number"
            prefix={<PhoneOutlined />}
          />
        </div>
        <div className="text-danger">{errors.phoneNumber}</div>

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="mt-5 w-50"
        >
          Register
        </Button>
        <div className="mt-2">
          <span>You have an account!</span>
          <NavLink to="/login">Login</NavLink>
        </div>
      </div>
    </form>
  );
}

const RegisterJiraWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    passWord: "",
    name: "",
    phoneNumber: "",
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("email is invalid!"),
    passWord: Yup.string()
      .min(6, "At least 6 character")
      .max(32, "No more 32 character"),
    phoneNumber: Yup.string().required("Phone number is required"),
    name: Yup.string().required("name is required"),
  }),

  handleSubmit: (
    { email, passWord, name, phoneNumber },
    { props, setSubmitting }
  ) => {
    props.dispatch(registerAction(email, passWord, name, phoneNumber));
  },

  displayName: "RegisterJira",
})(RegisterJira);

export default connect(null)(RegisterJiraWithFormik);
