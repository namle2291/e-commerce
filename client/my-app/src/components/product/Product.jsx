import React from "react";

import { Link } from "react-router-dom";
import new_label from "../../assets/img/new.png";
import trending_label from "../../assets/img/trending.png";
import { formatPrice } from "../../utils/formatPrice";
import { renderStar } from "../../utils/renderStar";
import SelectOption from "../selectOption/SelectOption";

export default function Product({ data, isNew = false }) {
  return (
    <div className="mb-[20px] p-[15px] border group">
      <div className="relative w-[243px] h-[243px] mb-[20px] overflow-hidden">
        <div className="absolute bottom-[-40px] w-full group-hover:bottom-0 transition-all">
          <SelectOption />
        </div>
        <img
          src={isNew ? new_label : trending_label}
          width={60}
          alt=""
          className="absolute right-[9px]"
        />
        <Link to={""}>
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/products/Untitled-1_31cc1c0e-ac34-4c8e-946a-a5e30acf6b1a_345x550.jpg?v=1491404855"
            alt=""
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-yellow-400 flex">
          {renderStar(data.totalRaitings)}
        </span>
        <Link to={""}>
          <span className="line-clamp-1 hover:text-main_color">
            {data.title}
          </span>
        </Link>
        <span className="mb-[10px]">{formatPrice(data.price)} VND</span>
      </div>
    </div>
  );
}
