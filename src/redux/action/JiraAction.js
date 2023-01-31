import { USER_SIGNIN_API } from "./../constant/jiraConstant";

export const signInAction = (email, passWord) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      passWord: passWord,
    },
  };
};
