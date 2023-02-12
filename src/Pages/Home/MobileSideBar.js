import React from "react";

export default function MobileSideBar(props) {
  return (
    <div>
      {/* As a link */}
      <nav className="navbar navbar-light bg-light w-100">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
      </nav>
      {/* As a heading */}
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">Navbar</span>
      </nav>
    </div>
  );
}
