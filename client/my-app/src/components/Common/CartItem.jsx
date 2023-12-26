import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import QuantityForm from '../Product/QuantityForm';

function CartItem({ data, removeItem, changeQuantity }) {
   const [quantity, setQuantity] = useState(1);

   useEffect(() => {
      changeQuantity(quantity, data.product._id, data.color);
   }, [quantity]);

   useEffect(() => {
      if (data.quantity) setQuantity(data.quantity);
   }, []);


   return (
      <div className="grid grid-cols-12 gap-4 py-4 border-b px-[20px]">
         <div className="col-span-7">
            <div className="flex items-center">
               <div className="w-[150px] h-[150px]">
                  <img
                     src={data?.thumb}
                     className="object-contain w-full h-full"
                     alt={data?.title}
                  />
               </div>
               <div className="pl-[20px]">
                  <Link to={`/product/${data.product?._id}`}>{data.title}</Link>
                  <p className="text-gray-500">{data?.color}</p>
                  <p
                     className="text-sm text-red-500 cursor-pointer"
                     onClick={() => removeItem(data.product._id, data.color)}
                  >
                     Remove
                  </p>
               </div>
            </div>
         </div>
         <div className="col-span-5 flex items-center justify-between">
            <div>
               <QuantityForm
                  max={data.stock}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  increase={(num) => setQuantity(num)}
                  decrease={(num) => setQuantity(num)}
                  showLabdata={false}
               />
            </div>
            <div>{formatPrice(quantity * data?.price)} VND</div>
         </div>
      </div>
   );
}

export default memo(CartItem);
