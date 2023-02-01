import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  GET_ALL_PROJECT_CATEGORY,
  SET_EDIT_SUBMIT_PROJECT,
  UPDATE_PROJECT_SAGA,
} from "../../../redux/constant/jiraConstant";
import { withFormik } from "formik";

function FormEditProject(props) {
  let arrProjectCategory = useSelector((state) => {
    return state.ProjectCategoryReducer.arrProjectCategory;
  });
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

  // const submitForm = (e) => {
  //   e.preventDefault();
  //   alert("submit edit");
  // };

  useEffect(() => {
    // Gọi api load project category
    dispatch({ type: GET_ALL_PROJECT_CATEGORY });
    // load sự kiệ submit lên drawer
    dispatch({ type: SET_EDIT_SUBMIT_PROJECT, submitFunction: handleSubmit });
  }, []);

  const handleEditChange = (content, editor) => {
    setFieldValue("description", content);
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p style={{ fontSize: "17px" }} className="font-italic">
              ID
            </p>
            <input
              value={values.id}
              disabled
              className="form-control"
              name="id"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p style={{ fontSize: "17px" }} className="font-italic">
              Project Name
            </p>
            <input
              value={values.projectName}
              onChange={handleChange}
              className="form-control"
              name="projectName"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p style={{ fontSize: "17px" }} className="font-italic">
              Project Category
            </p>
            <select
              className="form-control"
              name="categoryId"
              value={values.categoryId}
            >
              {arrProjectCategory?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p style={{ fontSize: "17px" }} className="font-italic">
              Description
            </p>
            <Editor
              // apiKey="your-api-key"
              // onInit={(evt, editor) => (editorRef.current = editor)}
              name="description"
              initialValue={values.description}
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
        </div>
      </div>
    </form>
  );
}

const EditProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    };
  },

  // Custom sync validation
  // SignupSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    // Khi người dùng bấm submit thì đưa dữ liệu về backend qua api
    props.dispatch({
      type: UPDATE_PROJECT_SAGA,
      projectUpdate: values,
    });
  },

  displayName: "EditProjectForm",
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectReducer.projectEdit,
});

export default connect(mapStateToProps)(EditProjectForm);
