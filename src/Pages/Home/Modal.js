import React from "react";
import { Desktop, Mobile, Tablet } from "../../HOC/Responsive";
import ModalJira from "./ModalJira";
import ModalMobile from "./ModalMobile";

export default function Modal(props) {
  return (
    <>
      <Desktop>
        <ModalJira />
      </Desktop>

      <Tablet>
        <ModalMobile />
      </Tablet>

      <Mobile />
      <ModalMobile />
    </>
  );
}
