import "./App.css";
import "./index.css";

import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";

import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Project from "./Pages/Project/Project";

import Register from "./Pages/Register/Register";

import { createBrowserHistory } from "history";
import { Route, Router, Switch, useHistory } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplates/HomeTemplate";

import { UserLoginTemplate } from "./templates/UserLoginTemplates/UserLoginTemplate";
import LoginJira from "./LoginJira/LoginJira";
import JiraTemplate from "./templates/JiraTemplates/JiraTemplate";

import CreateProject from "./Pages/CreateProject/CreateProject";

import DemoJira from "./DemoJira/DemoJira";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProjectManagement from "./Pages/ProjectManagement/ProjectManagement/ProjectManagement";

import DrawerJira from "./HOC/DrawerJira";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import IndexJira from "./IndexJira/IndexJira";

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

  return (
    //Cấu trúc history phiên bản react-router-dom @5.2.0
    <>
      <DrawerJira />
      <LoadingComponent />

      <Switch>
        <UserLoginTemplate exact path="/login" Component={LoginJira} />
        <UserLoginTemplate exact path="/register" Component={Register} />
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
          Component={ProjectManagement}
        />
        <JiraTemplate exact path="/" Component={ProjectManagement} />
      </Switch>
    </>
  );
}

export default App;
