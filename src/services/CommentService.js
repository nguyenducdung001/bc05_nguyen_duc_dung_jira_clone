import { baseService } from "./baseService";

export class CommentService extends baseService {
  constructor() {
    super();
  }

  getAllComment = (taskId) => {
    return this.get(`api/Comment/getAll?taskId=${taskId}`);
  };

  insertComment = (commentContent) => {
    return this.post(`api/Comment/insertComment`, commentContent);
  };

  deleteComment = (idComment) => {
    return this.delete(`api/Comment/deleteComment?idComment=${idComment}`);
  };

  updateComment = (updateComment) => {
    return this.put(
      `api/Comment/updateComment?id=${updateComment.id}&contentComment=${updateComment.contentComment}`,
      updateComment
    );
  };
}

export const commentService = new CommentService();
