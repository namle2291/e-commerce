import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import QuantityForm from '../Product/QuantityForm';

function CartItem({ el, removeItem, changeQuantity }) {
   const [quantity, setQuantity] = useState(1);

   useEffect(() => {
      changeQuantity && changeQuantity(quantity, el.product._id, el.color);
   }, [quantity]);

   return (
      <div className="grid grid-cols-12 gap-4 py-4 border-b px-[20px]">
         <div className="col-span-7">
            <div className="flex items-center">
               <div className="w-[150px] h-[150px]">
                  <img
                     src={el?.thumb}
                     className="object-contain w-full h-full"
                     alt={el?.title}
                  />
               </div>
               <div className="pl-[20px]">
                  <Link to={`/product/${el.product?._id}`}>{el.title}</Link>
                  <p className="text-gray-500">{el?.color}</p>
                  <p
                     className="text-sm text-red-500 cursor-pointer"
                     onClick={() => removeItem(el.product._id, el.color)}
                  >
                     Remove
                  </p>
               </div>
            </div>
         </div>
         <div className="col-span-5 flex items-center justify-between">
            <div>
               <QuantityForm
                  max={el.product.quantity}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  increase={(num) => setQuantity(num)}
                  decrease={(num) => setQuantity(num)}
                  showLabel={false}
               />
            </div>
            <div>{formatPrice(quantity * el?.price)} VND</div>
         </div>
      </div>
   );
}

export default memo(CartItem);
