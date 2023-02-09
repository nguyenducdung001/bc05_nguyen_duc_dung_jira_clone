import React from "react";

export default function PageNotFound() {
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ height: "100vh", width: "100vw" }}
    >
      <h1 className=" text-danger font-italic display-4">404</h1>
      <div className="  text-danger">Page Not Found</div>
    </div>
  );
}
