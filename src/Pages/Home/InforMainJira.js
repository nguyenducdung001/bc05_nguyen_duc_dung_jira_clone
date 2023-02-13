import React from "react";

export default function InforMainJira(props) {
  const { projectDetail } = props;

  const renderAvatar = () => {
    return projectDetail.members?.map((item, index) => {
      return (
        <div key={index} className="avatar">
          <img src={item.avatar} alt={item.avatar} />
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
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          {renderAvatar()}
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
    </>
  );
}
