import React from "react";

import { Link } from "react-router-dom";
import new_label from "../../assets/img/new.png";
import trending_label from "../../assets/img/trending.png";
import { formatPrice } from "../../utils/formatPrice";
import SelectOption from "../SelectOption/SelectOption";
import Star from "../Star/Star";

export default function NewArrivalProduct({ data, isNew = false }) {
  return (
    <div className="mb-[20px] group border relative">
      <div className="absolute duration-300 z-10 opacity-0 group-hover:opacity-100 top-0 left-0 right-0 bottom-0 bg-white">
        <div className="flex flex-col">
          <div className="flex justify-between items-center p-[15px] border-b">
            <Link to={""}>
              <span className="max-w-[200px] line-clamp-1 hover:text-main_color">
                {data.title}
              </span>
            </Link>
            <span>{formatPrice(data.price)} VND</span>
          </div>
          <div className="text-[13px] p-[15px]">
            <ul>
              {data?.description?.map((item, index) => (
                <li key={index} className="line-clamp-1 text-gray-500">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full duration-300">
            <SelectOption pid={data._id} justify="center" />
          </div>
        </div>
      </div>
      <div className="p-[15px]">
        <div className="relative w-[345px] h-[345px] mb-[20px] overflow-hidden">
          <img
            src={isNew ? new_label : trending_label}
            width={70}
            alt=""
            className="absolute right-[9px]"
          />
          <img
            src={data.thumb}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="line-clamp-1 hover:text-main_color">
            {data.title}
          </span>
          <Star totalRaitings={data.totalRaitings} />
          <span className="mb-[10px]">{formatPrice(data.price)} VND</span>
        </div>
      </div>
    </div>
  );
}
