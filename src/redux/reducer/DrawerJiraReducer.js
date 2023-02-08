import {
  OPEN_DRAWER,
  OPEN_FORM,
  OPEN_FORM_CREATE_TASK,
  OPEN_FORM_EDIT_PROJECT,
  OPEN_FORM_EDIT_USER,
  SET_EDIT_SUBMIT_PROJECT,
  SET_EDIT_SUBMIT_USER,
  SET_SUBMIT_CREATE_TASK,
} from "../constant/jiraConstant";
import { CLOSE_DRAWER } from "./../constant/jiraConstant";
import React from "react";

const initialState = {
  visible: false,
  title: "",
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
      state.title = action.title;
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
    case OPEN_FORM_CREATE_TASK: {
      state.visible = true;
      state.ComponentContentDrawer = action.Component;
      state.title = action.title;
      return { ...state };
    }
    case SET_SUBMIT_CREATE_TASK: {
      return { ...state, callBackSubmit: action.submitFunction };
    }
    case OPEN_FORM_EDIT_USER: {
      return {
        ...state,
        visible: true,
        ComponentContentDrawer: action.Component,
        title: action.title,
      };
    }
    case SET_EDIT_SUBMIT_USER: {
      return { ...state, callBackSubmit: action.submitFunction };
    }
    default:
      return { ...state };
  }
};
