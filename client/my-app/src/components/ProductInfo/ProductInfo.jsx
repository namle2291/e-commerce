import React, { memo, useState } from "react";

import { productInfoTabs } from "../../utils/contants";
import Star from "../Star/Star";
import VoteBar from "../VoteBar/VoteBar";
import Reviewer from "../Reviewers/Reviewer";
import VoteModal from "../VoteModal/VoteModal";

function ProductInfo({ data }) {
  const [activedTab, setActivedTab] = useState(1);
  const [showVote, setShowVote] = useState(false);

  return (
    <div>
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
              <div className="col-span-6 border border-red-600 m-4 rounded-sm flex flex-col justify-center">
                <div className="flex justify-center flex-col text-center">
                  <span className="text-[40px]">
                    {Number.isInteger(data.totalRaitings)
                      ? data.totalRaitings + ".0"
                      : data.totalRaitings}
                  </span>
                  <div className="flex justify-center">
                    <Star totalRaitings={data.totalRaitings} fs={14} />
                  </div>
                  <span>{data.raitings.length} reviews</span>
                </div>
              </div>
              <div className="col-span-6">
                {[1, 2, 3, 4, 5].reverse().map((item, index) => (
                  <VoteBar
                    key={index}
                    index={item}
                    percent={Math.floor(
                      (data?.raitings?.filter((el) => el.star === item).length /
                        data?.raitings?.length) *
                        100
                    )}
                    total={
                      data?.raitings?.filter((el) => el.star === item).length
                    }
                  />
                ))}
              </div>
            </div>
            <div className="text-center mt-3">
              <h2>Do you review this product?</h2>
              <button
                className={`px-3 py-2 bg-main_color rounded-sm mt-3 text-white`}
                onClick={() => setShowVote(true)}
              >
                Vote now!
              </button>

              {showVote && (
                <VoteModal product={data} showModal={setShowVote} />
              )}
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
