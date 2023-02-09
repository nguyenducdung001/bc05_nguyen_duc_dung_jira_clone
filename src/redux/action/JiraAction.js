import { USER_SIGNIN_API, USER_SIGNUP_API } from "./../constant/jiraConstant";

export const signInAction = (email, passWord) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      passWord: passWord,
    },
  };
};

export const registerAction = (email, passWord, name, phoneNumber) => {
  return {
    type: USER_SIGNUP_API,
    userRegister: {
      email,
      passWord,
      name,
      phoneNumber,
    },
  };
};
