import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem, updateCurrentCart } from '../../apis/userApi';
import { getCurrent, updateCart } from '../../app/reducers/userReducer';
import { message } from 'antd';
import CartItem from '../../components/Common/CartItem';
import { formatPrice } from '../../utils/formatPrice';
import { toast } from 'react-toastify';

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
         .catch((err) => {
            console.log(err);
         });
   };

   const handleUpdateCart = () => {
      const payload = currentCart.map((el) => ({
         product: el.product._id,
         color: el.color,
         title: el.title,
         thumb: el.thumb,
         price: +el.price,
         quantity: +el.quantity,
         stock: +el.stock,
      }));
      updateCurrentCart(payload)
         .then((res) => {
            if (res.success) {
               dispatch(getCurrent());
               toast.success(res.message);
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const handleChangeQuantity = useCallback(
      (quantity, pid, color) => {
         dispatch(updateCart({ quantity, pid, color }));
      },
      [currentCart]
   );

   return (
      <div className="mb-5">
         {contextHolder}
         <div>
            {currentCart?.length > 0 ? (
               <>
                  <div className="border">
                     <div className="grid grid-cols-12 gap-4 py-4 border-b px-[20px]">
                        <div className="col-span-7"></div>
                        <div className="col-span-5 flex items-center justify-between">
                           <span className="font-semibold">QUANTITY</span>
                           <span className="font-semibold">TOTAL</span>
                        </div>
                     </div>
                     {currentCart.map((el, index) => (
                        <CartItem
                           changeQuantity={handleChangeQuantity}
                           data={el}
                           key={index}
                           removeItem={handleRemove}
                        />
                     ))}
                  </div>
                  <div className="flex items-center justify-end mt-3">
                     <span>Subtotal:</span>
                     <span className="ml-2 text-lg font-semibold">
                        {formatPrice(
                           currentCart.reduce((sum, el) => {
                              return el.quantity * el.price + sum;
                           }, 0)
                        )}
                        {' VND'}
                     </span>
                  </div>
                  <div className="mt-3">
                     <p className="text-end text-gray-600">
                        <i>
                           Shipping, taxes, and discounts calculated at
                           checkout.
                        </i>
                     </p>
                     <div className="flex justify-end gap-2 mt-3">
                        <button
                           className="px-3 py-2 bg-black text-white"
                           onClick={handleUpdateCart}
                        >
                           Update Cart
                        </button>
                        <button className="px-3 py-2 bg-red-600 text-white">
                           Checkout
                        </button>
                     </div>
                  </div>
               </>
            ) : (
               <>
                  <p className="text-center text-gray-500">No products in cart!</p>
               </>
            )}
         </div>
      </div>
   );
}

export default memo(Cart);
