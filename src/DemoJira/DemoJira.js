import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "antd";

export default function DemoJira(props) {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center display-4 "
      style={{
        height: window.innerHeight,
      }}
    >
      <div
        className=" mb-3 text-center "
        style={{ fontStyle: "italic", color: "#00cec9" }}
      >
        <h1>Welcome To Jira Clone Web</h1>
        <h2>Enjoy This Experiment</h2>
      </div>
      <div>
        <Button className="mr-5" type="primary" size="large">
          <NavLink style={{ textDecoration: "none" }} to="/login">
            Login
          </NavLink>
        </Button>
        <Button type="primary" size="large">
          <NavLink style={{ textDecoration: "none" }} to="/register">
            Register
          </NavLink>
        </Button>
      </div>
      <div className=" mt-3">
        <Button type="primary" size="large">
          <NavLink style={{ textDecoration: "none" }} to="/jira">
            Jira
          </NavLink>
        </Button>
      </div>
    </div>
  );
}
