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
}

export const commentService = new CommentService();
