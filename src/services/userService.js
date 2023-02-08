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

  getUserByProjectId = (idProject) => {
    return this.get(`api/Users/getUserByProjectId?idProject=${idProject}`);
  };
  getListUser = () => {
    return this.get(`api/Users/getUser`);
  };
  updateUser = (editUser) => {
    return this.put(`api/Users/editUser`, editUser);
  };
  deleteUser = (idUser) => {
    return this.delete(`api/Users/deleteUser?id=${idUser}`);
  };
}

export const userService = new UserService();
