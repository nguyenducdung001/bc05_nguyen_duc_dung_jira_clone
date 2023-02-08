import React from "react";
import { NavLink } from "react-router-dom";
import "../../index.css";

import MenuJira from "./MenuJira";

import SideBarJira from "./SideBarJira";
import ModalJira from "./ModalJira";

export default function Home(props) {
  return (
    <div>
      <div className="jira">
        {/* Side bar */}
        <SideBarJira />

        {/* Menu */}
        <MenuJira />
        {props.children}
        {/* Modal */}
        <ModalJira />
      </div>
    </div>
  );
}
