import React from "react";

export default function CountDown({ unit, number }) {
  return (
    <div className="w-[82px] h-[82px] bg-gray-100 flex flex-col justify-center items-center py-[10px] px-[5px]">
      <span className="font-bold">{number}</span>
      <span className="text-[13px]">{unit}</span>
    </div>
  );
}
