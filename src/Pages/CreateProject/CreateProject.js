import React, { useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector, useDispatch, connect } from "react-redux";
import * as Yup from "yup";
import { withFormik } from "formik";
import {
  CREATE_PROJECT_SAGA,
  GET_ALL_PROJECT_CATEGORY,
} from "./../../redux/constant/jiraConstant";

function CreateProject(props) {
  const dispatch = useDispatch();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_CATEGORY,
    });
  }, []);

  let arrProjectCategory = useSelector((state) => {
    return state.ProjectCategoryReducer.arrProjectCategory;
  });
  // console.log("KetQua", arrProjectCategory);
  //
  const handleEditChange = (content, editor) => {
    setFieldValue("description", content);
  };
  return (
    <div className="container m-5">
      <h3>Create Project</h3>
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <p>Name</p>
          <input
            onChange={handleChange}
            className="form-control"
            type="text"
            name="projectName"
          />
        </div>
        <div className="form-group">
          <p>Description</p>

          <Editor
            // apiKey="your-api-key"
            // onInit={(evt, editor) => (editorRef.current = editor)}
            name="description"
            initialValue="<p>This is the initial content of the editor.</p>"
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
            onEditorChange={handleEditChange}
          />
        </div>
        <div className="form-group">
          <select
            name="categoryId"
            className="form-control"
            onChange={handleChange}
          >
            {arrProjectCategory.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Create Project
        </button>
      </form>
    </div>
  );
}

const createProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      projectName: "",
      description: "",
      categoryId: props.arrProjectCategory[0]?.id,
    };
  },

  // Custom sync validation
  // SignupSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: CREATE_PROJECT_SAGA,
      newProject: values,
    });
  },

  displayName: "CreateProjectFormik",
})(CreateProject);

const mapStateToProps = (state) => ({
  arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
});

export default connect(mapStateToProps)(createProjectForm);
