import { baseService } from "./baseService";

export class UserService extends baseService {
  constructor() {
    super();
  }

  getUser = (keyWord) => {
    return this.get(`api/Users/getUser?keyword=${keyWord}`);
  };

  assignUserProject = (userProject) => {
    return this.post(`api/Project/assignUserProject`, userProject);
  };
  removeUserFromProject = (userProject) => {
    return this.post(`api/Project/removeUserFromProject`, userProject);
  };
}

export const userService = new UserService();