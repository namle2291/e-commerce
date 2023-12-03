import React, { memo } from "react";

function ProductExtrainfo({ data }) {
  return (
    <li className="flex items-center gap-3 p-[10px] mb-[10px] border w-[253px]">
      <div className="w-[37px] h-[37px] flex justify-center items-center rounded-full bg-gray-700 text-white">
        {data.icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[14px]">{data.title}</span>
        <span className="text-[12px] text-gray-500">{data.detail}</span>
      </div>
    </li>
  );
}

export default memo(ProductExtrainfo);
