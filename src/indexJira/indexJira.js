import React from "react";
import HeaderMainJira from "./../Pages/Home/HeaderMainJira";
import InforMainJira from "./../Pages/Home/InforMainJira";
import ContentMainJira from "./../Pages/Home/ContentMainJira";

export default function indexJira() {
  return (
    <div className="main">
      <HeaderMainJira />
      <h3>Cyber Board</h3>
      <InforMainJira />
      <ContentMainJira />
    </div>
  );
}
