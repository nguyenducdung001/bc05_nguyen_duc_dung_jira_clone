import React, { Fragment } from "react";
import { Route } from "react-router-dom";

export default function HomeTemplate(props) {
  const { Component, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location, props.history, props.match

        return (
          <Fragment>
            <Component {...propsRoute} />
          </Fragment>
        );
      }}
    />
  );
}
