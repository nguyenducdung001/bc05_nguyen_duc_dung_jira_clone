import React from "react";

export default function InforMainMobile(props) {
  const { projectDetail } = props;

  const renderAvatar = () => {
    return projectDetail.members?.map((item, index) => {
      return (
        <div key={index} className="avatar">
          <img src={item.avatar} alt />
        </div>
      );
    });
  };

  return (
    <>
      <h3>{projectDetail.projectName}</h3>
      <section>
        <td dangerouslySetInnerHTML={{ __html: projectDetail.description }} />
      </section>
      <div className="info" style={{ display: "flex" }}>
        <div className="avatar-group" style={{ display: "flex" }}>
          {renderAvatar()}
        </div>
      </div>
    </>
  );
}
