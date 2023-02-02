import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { GET_PROJECT_DETAIL_API } from "../redux/constant/jiraConstant";
import HeaderMainJira from "./../Pages/Home/HeaderMainJira";
import InforMainJira from "./../Pages/Home/InforMainJira";
import ContentMainJira from "./../Pages/Home/ContentMainJira";

export default function IndexJira(props) {
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const dispatch = useDispatch();

  console.log("projectDetail", projectDetail);

  useEffect(() => {
    // Khi người dùng link qua trang này băng Navlink hay dùng đường dẫn url thì ta sẽ lấy được tham số từ url => gọi saga
    const { projectId } = props.match.params;
    dispatch({
      type: GET_PROJECT_DETAIL_API,
      projectId,
    });
  }, []);

  return (
    <div className="main">
      <HeaderMainJira projectDetail={projectDetail} />

      <InforMainJira projectDetail={projectDetail} />

      <ContentMainJira projectDetail={projectDetail} />
    </div>
  );
}
