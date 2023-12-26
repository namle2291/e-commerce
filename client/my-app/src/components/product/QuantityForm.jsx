import React, { memo } from 'react';

function QuantityForm({
   max,
   min = 1,
   quantity = 1,
   setQuantity,
   increase,
   decrease,
   showLabel = true,
}) {
   return (
      <div className="flex items-center gap-4">
         {showLabel && <label className="font-semibold"> Quantity</label>}
         <div className="relative w-[100px]">
            <button
               disabled={quantity === 1}
               type="button"
               className="absolute border-r-2 h-full w-[25px] hover:bg-gray-300"
               onClick={() => {
                  if (quantity > min) {
                     decrease((quantity -= 1));
                  }
               }}
            >
               -
            </button>
            <input
               required
               type="number"
               min={min}
               value={quantity}
               max={max}
               className="w-full py-[5px] px-[25px] text-center outline-none"
               onChange={(e) => setQuantity(e.target.value)}
            />
            <button
               disabled={quantity === max}
               type="button"
               className="absolute border-l-2 right-0 h-full w-[25px] hover:bg-gray-300"
               onClick={() => {
                  if (quantity < max) {
                     increase((quantity += 1));
                  }
               }}
            >
               +
            </button>
         </div>
      </div>
   );
}

export default memo(QuantityForm);
