import { EDIT_USER, GET_LIST_USER } from "../constant/UserManageConstant";

const initialState = {
  userList: [],
  editUser: {
    id: "1",
    passWord: "123",
    email: "alexa@gmail.com",
    name: "alexa",
    phoneNumber: "9990396",
  },
};

export const UserManageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_USER: {
      console.log("getListReducer", action);
      return { ...state, userList: action.userList };
    }
    case EDIT_USER: {
      console.log("editUser", action);
      const { editUser } = action;
      state.editUser = editUser;
      state.editUser.id = editUser.userId;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
