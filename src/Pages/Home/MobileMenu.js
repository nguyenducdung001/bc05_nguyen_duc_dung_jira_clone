import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import FormCreateTask from "../../components/Forms/FormCreateTask/FormCreateTask";
import {
  GET_ALL_PROJECT_DROPDOWN_SAGA,
  OPEN_FORM_CREATE_TASK,
} from "../../redux/constant/jiraConstant";

export default function MobileMenu(props) {
  const userLogin = useSelector(
    (state) => state.UserLoginJiraReducer.userLogin
  );

  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <div>
          <div className="account">
            <div className="avatar">
              <img src={userLogin.avatar} alt />
            </div>
          </div>
        </div>
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li
            style={{ cursor: "pointer" }}
            className="nav-item text-dark my-2 font-italic"
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
          >
            +Create task
          </li>

          <li className="nav-item active">
            <NavLink
              activeClassName="active font-weight-bold text-dark"
              style={{ textDecoration: "none" }}
              to="/projectmanagement"
            >
              Project management
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              activeClassName="active font-weight-bold text-dark"
              style={{ textDecoration: "none" }}
              to="/createproject"
            >
              Create Project
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="active font-weight-bold text-dark"
              style={{ textDecoration: "none" }}
              to="/usermanagement"
            >
              User management
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle font-italic"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              User {""}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <NavLink
                activeClassName="active font-weight-bold text-dark"
                style={{ textDecoration: "none" }}
                to="/register"
              >
                Register
              </NavLink>
              <div className="dropdown-divider" />
              <NavLink
                activeClassName="active font-weight-bold text-dark"
                style={{ textDecoration: "none" }}
                to="/login"
              >
                Login
              </NavLink>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
