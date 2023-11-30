import React from "react";
import { NavLink } from "react-router-dom";
import { navbars } from "../../utils/navbar";

function Navbar() {
  return (
    <div className="wrapper">
      <div className="border-t border-b py-[8px] flex justify-between items-center">
        <ul className="flex">
          {navbars &&
            navbars.map((el, index) => (
              <li key={index} className="uppercase text-[14px] pr-[30px]">
                <NavLink
                  to={el.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-600 font-[600]"
                      : "py-[5px] hover:text-red-600"
                  }
                >
                  {el.name}
                </NavLink>
              </li>
            ))}
        </ul>
        <div className="w-[250px]">
          <form action="">
            <input
              className="text-[14px] w-full outline-none px-[10px] py-[5px]"
              type="text"
              placeholder="Search something"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
