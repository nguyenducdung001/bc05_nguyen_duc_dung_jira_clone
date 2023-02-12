import React from "react";
import { Desktop, Mobile, Tablet } from "../../HOC/Responsive";
import UserManagement from "./UserManagement";
import UserManagementMobile from "./UserMangementMobile";

export default function UserManage(props) {
  return (
    <>
      <Desktop>
        <UserManagement />
      </Desktop>

      <Tablet>
        <UserManagementMobile />
      </Tablet>

      <Mobile>
        <UserManagementMobile />
      </Mobile>
    </>
  );
}
