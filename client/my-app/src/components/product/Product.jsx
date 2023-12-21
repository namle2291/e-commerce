import React from 'react';

import { Link } from 'react-router-dom';
import new_label from '../../assets/img/new.png';
import trending_label from '../../assets/img/trending.png';
import { formatPrice } from '../../utils/formatPrice';
import SelectOption from '../SelectOption/SelectOption';
import Star from '../Star/Star';

export default function Product({ data, isNew = false }) {
   return (
      <div className="mb-[20px] group border">
         <div className="p-[15px]">
            <div className="relative w-[243px] h-[243px] mb-[20px] overflow-hidden">
               <div className="absolute bottom-[-40px] w-full group-hover:bottom-0 duration-300">
                  <SelectOption product={data} />
               </div>
               <img
                  src={isNew ? new_label : trending_label}
                  width={70}
                  alt=""
                  className="absolute right-[9px]"
               />
               <Link to={`/product/${data._id}`}>
                  <img
                     src={data.thumb}
                     alt={data.title}
                     className="w-full h-full object-cover"
                  />
               </Link>
            </div>
            <div className="flex flex-col gap-2">
               <Link to={`/product/${data._id}`}>
                  <span className="line-clamp-1 hover:text-main_color">
                     {data.title}
                  </span>
               </Link>
               <Star totalRaitings={data.totalRaitings} />
               <span className="mb-[10px]">{formatPrice(data.price)} VND</span>
            </div>
         </div>
      </div>
   );
}
