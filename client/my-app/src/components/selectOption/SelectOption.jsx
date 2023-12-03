import React from "react";

import { IoEyeOutline, IoHeartSharp, IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function SelectOption({ pid, justify = "center" }) {
  console.log(pid);
  return (
    <div className={`flex justify-${justify} gap-3 w-full`}>
      <span className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-slate-50 hover:bg-black hover:text-white border cursor-pointer">
        <IoHeartSharp className="text-[18px]" />
      </span>
      <Link
        to={`/product/${pid}`}
        className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-slate-50 hover:bg-black hover:text-white border cursor-pointer"
      >
        <IoMenu className="text-[18px]" />
      </Link>
      <span className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-slate-50 hover:bg-black hover:text-white border cursor-pointer">
        <IoEyeOutline className="text-[18px]" />
      </span>
    </div>
  );
}
