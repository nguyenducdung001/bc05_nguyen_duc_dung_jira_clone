import React from "react";
import { NavLink } from "react-router-dom";
// import "../../index.css";
import { useSelector } from "react-redux";

export default function MenuJira(props) {
  const userLogin = useSelector(
    (state) => state.UserLoginJiraReducer.userLogin
  );
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={userLogin.avatar} alt />
        </div>
        <div className="account-info">
          <p>{userLogin.name}</p>
          <p> {userLogin.email}</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card" />
          <NavLink
            activeClassName="active font-weight-bold text-dark"
            style={{ textDecoration: "none" }}
            to="/jira"
          >
            Cyber Board
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog" />
          <NavLink
            activeClassName="active font-weight-bold text-dark"
            style={{ textDecoration: "none" }}
            to="/projectmanagement"
          >
            Project management
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog" />
          <NavLink
            activeClassName="active font-weight-bold text-dark"
            style={{ textDecoration: "none" }}
            to="/createproject"
          >
            Create Project
          </NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
}
