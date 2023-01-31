import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import SideBarJira from "./../../Pages/Home/SideBarJira";
import MenuJira from "./../../Pages/Home/MenuJira";
import ModalJira from "../../Pages/Home/ModalJira";

export default function JiraTemplate(props) {
  const { Component, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location, props.history, props.match

        return (
          <>
            <div className="jira">
              {/* Side bar */}
              <SideBarJira />

              {/* Menu */}
              <MenuJira />
              {/* main */}
              <Component {...propsRoute} />
              {/* Modal */}
              <ModalJira />
            </div>
          </>
        );
      }}
    />
  );
}
