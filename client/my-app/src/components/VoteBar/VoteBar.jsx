import React, { memo } from "react";
import { IoStar } from "react-icons/io5";

function VoteBar({ index, total, percent }) {
  return (
    <div className="flex items-center py-2">
      <span className="w-[20px] inline-block text-center">{index}</span>
      <span className="text-[13px] text-yellow-600">
        <IoStar />
      </span>
      <div className="relative h-[5px] bg-gray-300 mx-[10px] flex-1">
        <div
          className={`absolute h-full bg-red-600 w-[${Math.floor(
            percent * 100
          )}%]`}
        ></div>
      </div>
      <span className="w-[20px] inline-block text-center">{total}</span>
    </div>
  );
}

export default memo(VoteBar);
