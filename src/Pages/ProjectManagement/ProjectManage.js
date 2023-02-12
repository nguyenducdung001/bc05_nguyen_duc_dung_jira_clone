import React from "react";
import { Desktop, Mobile, Tablet } from "../../HOC/Responsive";
import ProjectManagement from "./ProjectManagement";
import ProjectManagementMobile from "./ProjectManagementMobile";

export default function ProjectManage(props) {
  return (
    <>
      <Desktop>
        <ProjectManagement />
      </Desktop>

      <Tablet>
        <ProjectManagementMobile />
      </Tablet>

      <Mobile>
        <ProjectManagementMobile />
      </Mobile>
    </>
  );
}
