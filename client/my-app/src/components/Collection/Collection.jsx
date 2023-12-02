import React from "react";
import { Link } from "react-router-dom";
import { RightIcon } from "../Icons/Icon";

export default function Collection({ data }) {
  return (
    <div className="flex items-start p-[15px]">
      <div className="w-[143px] h-[143px]">
        <img
          src="https://png.pngtree.com/template/20220419/ourmid/pngtree-photo-coming-soon-abstract-admin-banner-image_1262901.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="pl-[20px]">
        <div className="mb-[10px] uppercase font-semibold text-[14px]">
          {data.title}
        </div>
        <ul>
          {data?.brand?.map((item, index) => (
            <Link key={index}>
              <li className="flex items-center mb-[5px] text-[14px] text-gray-500 hover:text-main_color">
                <span className="mr-[5px]">
                  <RightIcon />
                </span>
                <span>{item}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
