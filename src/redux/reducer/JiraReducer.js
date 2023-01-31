const initialState = {
  userInfor: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "userLogin": {
      return { ...state, userInfor: action.payload };
    }
    default:
      return { ...state };
  }
};
