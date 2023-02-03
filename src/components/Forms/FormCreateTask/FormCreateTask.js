import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Divider, Select, Slider, Typography } from "antd";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  GET_ALL_PROJECT_DROPDOWN_SAGA,
  GET_USER_API,
} from "../../../redux/constant/jiraConstant";
import { GET_ALL_TASK_TYPE_SAGA } from "../../../redux/constant/TaskTypeConstant";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/constant/PriorityConstant";
import { withFormik } from "formik";
import * as Yup from "yup";
import { CREATE_TASK_SAGA } from "../../../redux/constant/TaskConstants";

function FormCreateTask(props) {
  // Lấy dữ liệu từ redux
  const { arrProject } = useSelector((state) => state.ProjectJiraReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { userSearch } = useSelector((state) => state.UserLoginJiraReducer);

  // Do kết nối với withformik => component có các props
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  // Hàm biến đổi option cho select
  const userOption = userSearch.map((item, index) => {
    return { value: item.userId, label: item.name };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_DROPDOWN_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_USER_API, keyWord: "" });
  }, []);

  const [timeTracking, setTimetracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const options = [];
  for (let i = 0; i < 100000; i++) {
    const value = `${i.toString(36)}${i}`;
    options.push({
      label: value,
      value,
      disabled: i === 10,
    });
  }

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <p>Project</p>
        <select
          name="projectId"
          className="form-control"
          onChange={handleChange}
        >
          {arrProject.map((project, index) => {
            return (
              <option key={index} value={project.id}>
                {project.projectName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <p>Task name</p>
        <input
          name="taskName"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Priority</p>
            <select
              name="priorityId"
              className="form-control"
              onChange={handleChange}
            >
              {arrPriority.map((item, index) => {
                return (
                  <option key={index} value={item.priorityId}>
                    {item.priority}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-6">
            <p>Task type</p>
            <select
              className="form-control"
              name="typeId"
              onChange={handleChange}
            >
              {arrTaskType.map((taskType, index) => {
                return (
                  <option key={index} value={taskType.id}>
                    {taskType.taskType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Assignees</p>
            <Select
              mode="multiple"
              style={{
                width: "100%",
              }}
              optionFilterProp="label"
              placeholder="Please select"
              onChange={(values) => {
                setFieldValue("listUserAsign", values);
              }}
              options={userOption}
              onSelect={(value) => {
                console.log("value", value);
              }}
            />
            <div className="row " style={{ marginTop: "10px" }}>
              <div className="col-12">
                <p>Original estimate</p>
                <input
                  onChange={handleChange}
                  type="number"
                  min={0}
                  defaultValue={0}
                  className="form-control"
                  name="originalEstimate"
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <p>Time tracking</p>
            <Slider
              value={timeTracking.timeTrackingSpent}
              defaultValue={30}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
            />
            <div className="row" style={{ fontSize: "12px" }}>
              <div className="col-6 text-left font-italic">
                {timeTracking.timeTrackingSpent}h logged
              </div>
              <div className="col-6 text-right font-italic">
                {timeTracking.timeTrackingRemaining}h remaining
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <p>Time spent</p>
                <input
                  onChange={(e) => {
                    setTimetracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                    setFieldValue("timeTrackingSpent", e.target.value);
                  }}
                  min={0}
                  defaultValue={0}
                  type="number"
                  className="form-control"
                  name="timeTrackingSpent"
                />
              </div>
              <div className="col-6">
                <p>Time remaining</p>
                <input
                  onChange={(e) => {
                    setTimetracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                    setFieldValue("timeTrackingRemaining", e.target.value);
                  }}
                  min={0}
                  defaultValue={0}
                  type="number"
                  className="form-control"
                  name="timeTrackingRemaining"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <p>Description</p>
        <Editor
          // apiKey="your-api-key"
          // onInit={(evt, editor) => (editorRef.current = editor)}
          name="description"
          initialValue=""
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={(content, editor) => {
            setFieldValue("description", content);
          }}
        />
      </div>
      <button type="submit" className="btn btn-outline-secondary">
        Submit
      </button>
    </form>
  );
}

const FormCreateTaskWithFormik = withFormik({
  // enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      taskName: "",
      description: "",
      statusId: 1,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: 0,
      typeId: 0,
      priorityId: 0,
      listUserAsign: [],
    };
  },

  // Custom sync validation
  // SignupSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    // Khi người dùng bấm submit thì đưa dữ liệu về backend qua api
    props.dispatch({
      type: CREATE_TASK_SAGA,
      taskOject: values,
    });
  },

  displayName: "FormCreateTask",
})(FormCreateTask);

const mapStateToProps = (state) => ({});

export default connect(null)(FormCreateTaskWithFormik);
