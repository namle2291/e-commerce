import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="wrapper">
      <div className="border-t border-b py-[8px] flex justify-between items-center">
        <ul className="flex">
          <li className="uppercase text-[14px] pr-[30px]">
            <Link className="py-[5px]" to={"/"}>
              Home
            </Link>
          </li>
          <li className="uppercase text-[14px] pr-[30px]">
            <Link className="py-[5px]" to={"/about"}>
              Blog
            </Link>
          </li>
          <li className="uppercase text-[14px] pr-[30px]">
            <Link className="py-[5px]" to={"/contact"}>
              Contact Us
            </Link>
          </li>
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
