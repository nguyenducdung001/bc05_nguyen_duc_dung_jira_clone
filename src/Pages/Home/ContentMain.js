import React from "react";
import { Desktop, Mobile, Tablet } from "../../HOC/Responsive";
import ContentMainJira from "./ContentMainJira";
import ContentMainMobile from "./ContentMainMobile";

export default function ContentMain(props) {
  const { projectDetail } = props;
  return (
    <>
      <Desktop>
        <ContentMainJira projectDetail={projectDetail} />
      </Desktop>

      <Tablet>
        <ContentMainMobile projectDetail={projectDetail} />
      </Tablet>

      <Mobile>
        <ContentMainMobile projectDetail={projectDetail} />
      </Mobile>
    </>
  );
}
