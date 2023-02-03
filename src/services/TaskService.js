import { baseService } from "./baseService";

export class TaskService extends baseService {
  constructor() {
    super();
  }

  createTask = (taskOject) => {
    return this.post(`api/Project/createTask`, taskOject);
  };
}

export const taskService = new TaskService();
