import React from "react";

import { IoEyeOutline, IoHeartSharp, IoMenu } from "react-icons/io5";

export default function SelectOption() {
  return (
    <div className="flex justify-center gap-3 w-full">
      <span className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-slate-50 hover:bg-black hover:text-white border cursor-pointer">
        <IoHeartSharp className="text-[18px]" />
      </span>
      <span className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-slate-50 hover:bg-black hover:text-white border cursor-pointer">
        <IoMenu className="text-[18px]" />
      </span>
      <span className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-slate-50 hover:bg-black hover:text-white border cursor-pointer">
        <IoEyeOutline className="text-[18px]" />
      </span>
    </div>
  );
}
