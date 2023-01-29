import React from "react";
import { NavLink } from "react-router-dom";

export default function Home(props) {
  return (
    <div className="grid grid-cols-10 gap-3 container py-5">
      <div className=" col-span-2">
        <ul>
          <li>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              <NavLink to="/login" type="button">
                Login
              </NavLink>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
