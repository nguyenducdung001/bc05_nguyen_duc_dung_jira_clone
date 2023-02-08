const initialState = {
  editComment: {
    id: "",
    userId: "",
    taskId: "",
    contentComment: "",
  },
};

export const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};
