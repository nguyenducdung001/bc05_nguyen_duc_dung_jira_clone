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
}

export const taskService = new TaskService();
