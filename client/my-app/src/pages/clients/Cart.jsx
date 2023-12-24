import React, { memo, useCallback } from 'react';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem } from '../../apis/userApi';
import { getCurrent, updateCart } from '../../app/reducers/userReducer';
import { message } from 'antd';
import CartItem from '../../components/Common/CartItem';
import { formatPrice } from '../../utils/formatPrice';
function Cart() {
   const { currentCart } = useSelector((state) => state.user);
   const [messageApi, contextHolder] = message.useMessage();

   const dispatch = useDispatch();

   const handleRemove = (id, color) => {
      removeCartItem({ pid: id, color })
         .then((res) => {
            if (res.success) {
               dispatch(getCurrent());
               messageApi.open({
                  type: 'info',
                  content: res.message,
               });
            }
         })
         .catch((err) => {});
   };

   const handleUpdateCart = (quantity, pid, color) => {
      dispatch(updateCart({ quantity, pid, color }));
   };

   return (
      <div className="mb-5">
         {contextHolder}
         <div>
            <Breadcrumb category="YOUR CART" />
         </div>
         <div className="wrapper">
            {currentCart?.length > 0 ? (
               <>
                  <div className="border">
                     <div className="grid grid-cols-12 gap-4 py-4 border-b px-[20px]">
                        <div className="col-span-7"></div>
                        <div className="col-span-5 flex items-center justify-between">
                           <span>QUANTITY</span>
                           <span>TOTAL</span>
                        </div>
                     </div>
                     {currentCart.map((el, index) => (
                        <CartItem
                           changeQuantity={handleUpdateCart}
                           el={el}
                           key={index}
                           removeItem={handleRemove}
                        />
                     ))}
                  </div>
               </>
            ) : (
               <>
                  <p className="text-center text-gray-500">No items in cart!</p>
               </>
            )}
            <div className="flex justify-end">
               <span>Sub total:</span>
               <span className="ml-2">
                  {formatPrice(
                     currentCart.reduce((sum, el) => {
                        return +el.quantity * +el.price + sum;
                     }, 0)
                  )}
                  VND
               </span>
            </div>
         </div>
      </div>
   );
}

export default memo(Cart);
