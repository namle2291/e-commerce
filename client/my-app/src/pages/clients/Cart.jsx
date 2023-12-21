import React from 'react';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import { removeCartItem } from '../../apis/userApi';
import { getCurrent } from '../../app/reducers/userReducer';
import { message } from 'antd';
function Cart() {
   const [messageApi, contextHolder] = message.useMessage();
   const { userInfo } = useSelector((state) => state.user);

   const dispatch = useDispatch();

   const handleRemove = (id) => {
      removeCartItem({ pid: id })
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

   return (
      <div className="mb-5">
         {contextHolder}
         <div>
            <Breadcrumb category="YOUR CART" />
         </div>
         <div className="wrapper">
            {userInfo?.cart.length > 0 ? (
               <>
                  <div className="border">
                     <div className="grid grid-cols-12 gap-4 py-4 border-b px-[20px]">
                        <div className="col-span-7"></div>
                        <div className="col-span-5 flex items-center justify-between">
                           <span>QUANTITY</span>
                           <span>TOTAL</span>
                        </div>
                     </div>
                     {userInfo?.cart?.map((el, index) => (
                        <div
                           key={index}
                           className="grid grid-cols-12 gap-4 py-4 border-b px-[20px]"
                        >
                           <div className="col-span-7">
                              <div className="flex items-center">
                                 <div className="w-[150px] h-[150px]">
                                    <img
                                       src={el.product?.thumb}
                                       className="object-contain w-full h-full"
                                       alt={el.product?.title}
                                    />
                                 </div>
                                 <div className="pl-[20px]">
                                    <Link to={`/product/${el.product?._id}`}>
                                       {el.product?.title}
                                    </Link>
                                    <p className="text-gray-500">
                                       {el.product?.color}
                                    </p>
                                    <p
                                       className="text-sm text-red-500 cursor-pointer"
                                       onClick={() =>
                                          handleRemove(el.product._id)
                                       }
                                    >
                                       Remove
                                    </p>
                                 </div>
                              </div>
                           </div>
                           <div className="col-span-5 flex items-center justify-between">
                              <div>
                                 <div className="relative w-[100px]">
                                    <button
                                       type="button"
                                       className="absolute border-r-2 h-full w-[25px] hover:bg-gray-300"
                                       onClick={() => {
                                          //   if (quantity > 1) {
                                          //      setQuantity((prev) => prev - 1);
                                          //   }
                                       }}
                                    >
                                       -
                                    </button>
                                    <input
                                       type="text"
                                       min={1}
                                       value={el.quantity}
                                       max={el.product?.quantity}
                                       className="w-full py-[5px] px-[25px] text-center outline-none"
                                       onChange={() => {}}
                                    />
                                    <button
                                       type="button"
                                       className="absolute border-l-2 right-0 h-full w-[25px] hover:bg-gray-300"
                                       onClick={() => {
                                          //   if (quantity < el.product.quantity) {
                                          //      setQuantity((prev) => prev + 1);
                                          //   }
                                       }}
                                    >
                                       +
                                    </button>
                                 </div>
                              </div>
                              <div>{formatPrice(el.product?.price)} VND</div>
                           </div>
                        </div>
                     ))}
                  </div>
               </>
            ) : (
               <>
                  <p className='text-center text-gray-500'>No items in cart!</p>
               </>
            )}
         </div>
      </div>
   );
}

export default Cart;
