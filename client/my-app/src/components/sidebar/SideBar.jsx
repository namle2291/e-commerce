import React, { useEffect, useState } from "react";
import { httpRequest } from "../../axios/custom-axios";
import { NavLink } from "react-router-dom";

function SideBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    httpRequest
      .get("/categories")
      .then((res) => {
        setCategories(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <ul>
        <li className="uppercase py-[10px] px-[20px] bg-main_color text-white font-semibold">
          <i className="fa fa-list mr-[10px]"></i> <span>ALL COLLECTIONS</span>
        </li>
        {categories &&
          categories.map((item, index) => (
            <li
              key={index}
              className="uppercase pt-[15px] pr-[20px] pb-[14px] pl-[20px] "
            >
              <NavLink to={"/"}>{item.title}</NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SideBar;
