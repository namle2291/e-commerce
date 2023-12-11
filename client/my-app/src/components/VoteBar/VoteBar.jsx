import React, { memo, useEffect, useRef } from "react";
import { IoStar } from "react-icons/io5";

function VoteBar({ index, total, percent }) {
  const percentRef = useRef();

  useEffect(() => {
    percentRef.current.style.width = percent + "%";
  }, [percent]);

  return (
    <div className="flex items-center py-2">
      <span className="w-[20px] inline-block text-center">{index}</span>
      <span className="text-[13px] text-yellow-600">
        <IoStar />
      </span>
      <div className="relative h-[5px] bg-gray-300 mx-[10px] flex-1">
        <div ref={percentRef} className={`absolute h-full bg-red-600`}></div>
      </div>
      <span className="w-[20px] inline-block text-center">{total}</span>
    </div>
  );
}

export default memo(VoteBar);
