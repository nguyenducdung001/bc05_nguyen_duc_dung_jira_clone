import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import SideBarJira from "./../../Pages/Home/SideBarJira";
import MenuJira from "./../../Pages/Home/MenuJira";

import { Desktop, Mobile, Tablet } from "../../HOC/Responsive";
import MobileSideBar from "../../Pages/Home/MobileSideBar";
import MobileMenu from "../../Pages/Home/MobileMenu";
import Modal from "../../Pages/Home/Modal";

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
              <Desktop>
                <SideBarJira />
              </Desktop>

              <Mobile></Mobile>

              {/* Menu */}

              <Desktop>
                <MenuJira />
              </Desktop>

              <Mobile>
                <MobileMenu />
              </Mobile>

              <Tablet>
                <MobileMenu />
              </Tablet>

              {/* main */}
              <Component {...propsRoute} />
              {/* Modal */}
              <Modal />
            </div>
          </>
        );
      }}
    />
  );
}
