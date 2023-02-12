import "./App.css";
import "./index.css";

import PageNotFound from "./Pages/PageNotFound/PageNotFound";

import { createBrowserHistory } from "history";
import { Route, Router, Switch, useHistory } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplates/HomeTemplate";

import { UserLoginTemplate } from "./templates/UserLoginTemplates/UserLoginTemplate";
import LoginJira from "./LoginJira/LoginJira";
import JiraTemplate from "./templates/JiraTemplates/JiraTemplate";

import CreateProject from "./Pages/CreateProject/CreateProject";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProjectManagement from "./Pages/ProjectManagement/ProjectManagement";

import DrawerJira from "./HOC/DrawerJira";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import IndexJira from "./ProjectDetail/IndexJira";

import DragAndDropDnd from "./Pages/DragAndDropDnD/DragAndDropDnD";
import UserManagement from "./Pages/UserManagement/UserManagement";
import RegisterJira from "./RegisterJira/RegisterJira";
import { USER_LOGIN_SETTING_SYSTEM } from "./util/constants/settingSystem";
import ProjectManage from "./Pages/ProjectManagement/ProjectManage";
import UserManage from "./Pages/UserManagement/UserManage";

// Dùng để phân component
export const history = createBrowserHistory();

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "ADD_HISTORY",
      history: history,
    });
  }, []);

  let dataJson = localStorage.getItem(USER_LOGIN_SETTING_SYSTEM);

  if (dataJson === null) {
    history.push("/login");
  }

  return (
    //Cấu trúc history phiên bản react-router-dom @5.2.0
    <>
      <DrawerJira />
      <LoadingComponent />

      <Switch>
        <UserLoginTemplate exact path="/login" Component={LoginJira} />
        <UserLoginTemplate exact path="/register" Component={RegisterJira} />
        <JiraTemplate exact path="/jira" Component={IndexJira} />
        <JiraTemplate exact path="/createproject" Component={CreateProject} />
        <JiraTemplate
          exact
          path="/projectdetail/:projectId"
          Component={IndexJira}
        />
        <JiraTemplate
          exact
          path="/projectManagement"
          Component={ProjectManage}
        />

        <JiraTemplate exact path="/" Component={ProjectManage} />

        <JiraTemplate exact path="/usermanagement" Component={UserManage} />
        <HomeTemplate exact path="/dragdrop" Component={DragAndDropDnd} />
        <HomeTemplate exact path="*" Component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
