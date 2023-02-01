import {
  OPEN_DRAWER,
  OPEN_FORM,
  OPEN_FORM_EDIT_PROJECT,
  SET_EDIT_SUBMIT_PROJECT,
} from "../constant/jiraConstant";
import { CLOSE_DRAWER } from "./../constant/jiraConstant";
import React from "react";

const initialState = {
  visible: false,
  ComponentContentDrawer: <p>Default</p>,
  callBackSubmit: (propsValue) => alert("click demo"),
};

export const DrawerJiraReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER: {
      return { ...state, visible: true };
    }
    case CLOSE_DRAWER: {
      return { ...state, visible: false };
    }
    case OPEN_FORM_EDIT_PROJECT: {
      return {
        ...state,
        visible: true,
        ComponentContentDrawer: action.Component,
      };
    }
    case SET_EDIT_SUBMIT_PROJECT: {
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
