import React from "react";
import Star from "../Star/Star";

function Reviewer({ data }) {
  return (
    <div className="p-[20px]">
      <h2 className="font-semibold">CUSTOMER REVIEWS</h2>
      <div className="mt-[20px]">
        {data?.map((item, index) => (
          <div key={index} className="flex items-center gap-2 mb-[20px]">
            <div className="w-[40px] h-[40px] text-white bg-blue-500 rounded-full flex justify-center items-center">
              <span>{item.postedBy.first_name.slice(0, 1)}</span>
            </div>
            <div key={index} className="flex flex-col">
              <Star totalRaitings={item.star} />
              <p className="text-gray-500 font-open_sans">{item.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviewer;
