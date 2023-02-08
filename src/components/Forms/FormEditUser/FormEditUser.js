// accessToken
// :
// "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJjeWJlcnNvZnQwMDFAZ21haWwuY29tIiwibmJmIjoxNjc1ODI2Nzc2LCJleHAiOjE2NzU4MzAzNzZ9.hJwN-RIPZu7BdR7lyiAQfIOGxPnNuSx2QDhRz2czVLQ"
// avatar
// :
// "https://ui-avatars.com/api/?name=cyber"
// email
// :
// "cybersoft001@gmail.com"
// id
// :
// 4092
// name
// :
// "cyber"
// phoneNumber
// :
// "10091900"

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { useDispatch } from "react-redux";
import { SET_EDIT_SUBMIT_USER } from "../../../redux/constant/jiraConstant";
import { UPDATE_USER_SAGA } from "../../../redux/constant/UserManageConstant";

function FormEditUser(props) {
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
      type: SET_EDIT_SUBMIT_USER,
      submitFunction: handleSubmit,
    });
  }, []);

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <p className="font-italic">ID</p>
            <input
              disabled
              value={values.id}
              className="form-control"
              name="id"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <p className="font-italic">Name</p>
            <input
              value={values.name}
              onChange={handleChange}
              className="form-control"
              name="name"
            />
          </div>
        </div>

        <div className="col-6">
          <div className="form-group">
            <p className="font-italic">PassWord</p>
            <input
              value={values.passWord}
              onChange={handleChange}
              className="form-control"
              name="passWord"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <p className="font-italic">Email</p>
            <input
              value={values.email}
              onChange={handleChange}
              className="form-control"
              name="email"
            />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-italic">Phone Number</p>
            <input
              value={values.phoneNumber}
              onChange={handleChange}
              className="form-control"
              name="phoneNumber"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

const EditUserWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { editUser } = props;
    return {
      id: editUser.id,
      passWord: editUser.passWord,
      email: editUser.email,
      name: editUser.name,
      phoneNumber: editUser.phoneNumber,
    };
  },

  // Custom sync validation
  // SignupSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    // Khi người dùng bấm submit thì đưa dữ liệu về backend qua api
    props.dispatch({
      type: UPDATE_USER_SAGA,
      editUser: values,
    });
  },

  displayName: "FormEditUser",
})(FormEditUser);

const mapStateToProps = (state) => ({
  editUser: state.UserManageReducer.editUser,
});

export default connect(mapStateToProps)(EditUserWithFormik);