import React, { memo, useState } from "react";

import { productInfoTabs } from "../../utils/contants";
import Star from "../Star/Star";
import VoteBar from "../VoteBar/VoteBar";
import Reviewer from "../Reviewers/Reviewer";

function ProductInfo({ data }) {
  const [activedTab, setActivedTab] = useState(1);
  return (
    <div className="">
      {/* Tabs */}
      <div className="flex gap-1">
        {productInfoTabs.map((item) => (
          <span
            key={item.id}
            className={`cursor-pointer uppercase px-[20px] py-[9px] inline-block
                  ${
                    activedTab === item.id ? "bg-gray-100" : "bg-gray-200"
                  } hover:bg-gray-100
                  `}
            onClick={() => setActivedTab(item.id)}
          >
            {item.title}
          </span>
        ))}
      </div>
      <div className="p-4 border">
        {productInfoTabs.some((el) => el.id === activedTab) && (
          <div className="text-[14px]">
            {productInfoTabs[activedTab - 1].content}
          </div>
        )}
        {activedTab === 1 && (
          <div>
            {data.description && (
              <>
                <ul className="list-disc pl-[20px]">
                  {data?.description?.map((item, index) => (
                    <li key={index} className="text-[14px] text-gray-500">
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
        {activedTab === 5 && (
          <>
            <div className="grid grid-cols-12">
              <div className="col-span-4 mx-auto">
                <div className="w-[150px] h-[150px] flex justify-center flex-col text-center">
                  <span className="text-[40px]">
                    {Number.isInteger(data.totalRaitings)
                      ? data.totalRaitings + ".0"
                      : data.totalRaitings}
                  </span>
                  <div className="flex justify-center">
                    <Star totalRaitings={data.totalRaitings} fs={14} />
                  </div>
                  <span>{data.raitings.length} review</span>
                </div>
              </div>
              <div className="col-span-6">
                {[1, 2, 3, 4, 5].reverse().map((item, index) => (
                  <VoteBar
                    key={index}
                    index={item}
                    percent={
                      data.raitings.filter((el) => el.star === item).length /
                      data.raitings.length
                    }
                    total={
                      data.raitings.filter((el) => el.star === item).length
                    }
                  />
                ))}
              </div>
            </div>
            {/* Reviewers */}
            <Reviewer data={data.raitings} />
          </>
        )}
      </div>
    </div>
  );
}

export default memo(ProductInfo);
