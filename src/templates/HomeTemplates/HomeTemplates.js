import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Header from "../../Pages/Header/Header";

export const UserLoginTemplates = (props) => {
  let { Component, ...restParam } = props;

  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <>
            <Header />
            <Component {...propsRoute} />
          </>
        );
      }}
    />
  );
};
