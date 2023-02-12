import React from "react";
import { Desktop, Mobile, Tablet } from "../../HOC/Responsive";
import ProjectManagement from "./ProjectManagement";
import ProjectManagementMobile from "./ProjectManagementMobile";
import ProjectManagementTablet from "./ProjectManagementTablet";

export default function ProjectManage(props) {
  return (
    <>
      <Desktop>
        <ProjectManagement />
      </Desktop>

      <Tablet>
        <ProjectManagementTablet />
      </Tablet>

      <Mobile>
        <ProjectManagementMobile />
      </Mobile>
    </>
  );
}
