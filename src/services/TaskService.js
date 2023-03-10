import { baseService } from "./baseService";

export class TaskService extends baseService {
  constructor() {
    super();
  }

  createTask = (taskOject) => {
    return this.post(`api/Project/createTask`, taskOject);
  };

  getTaskDetail = (taskId) => {
    return this.get(`api/Project/getTaskDetail?taskId=${taskId}`);
  };

  updateStatusTask = (taskStatusUpdate) => {
    return this.put(`api/Project/updateStatus`, taskStatusUpdate);
  };

  updateTask = (taskUpdate) => {
    return this.post(`api/Project/updateTask`, taskUpdate);
  };
  deleteTask = (taskId) => {
    return this.delete(`api/Project/removeTask?taskId=${taskId}`);
  };
}

export const taskService = new TaskService();
