import React from "react";
import { Desktop, Mobile, Tablet } from "../../HOC/Responsive";
import InforMainJira from "./InforMainJira";
import InforMainMobile from "./InforMainMobile";

export default function InforMain(props) {
  const { projectDetail } = props;
  return (
    <>
      <Desktop>
        <InforMainJira projectDetail={projectDetail} />
      </Desktop>

      <Tablet>
        <InforMainMobile projectDetail={projectDetail} />
      </Tablet>

      <Mobile>
        <InforMainMobile projectDetail={projectDetail} />
      </Mobile>
    </>
  );
}
