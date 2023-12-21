import React, { memo, useEffect } from 'react';

import { IoEyeOutline } from 'react-icons/io5';
import { BsCart, BsCartCheck } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../../apis/userApi';
import { message } from 'antd';
import { getCurrent } from '../../app/reducers/userReducer';

function SelectOption({ product, justify = 'center' }) {
   const { userInfo } = useSelector((state) => state.user);
   const [messageApi, contextHolder] = message.useMessage();

   const dispatch = useDispatch();

   const handleAddToCart = () => {
      if (userInfo) {
         updateCart({ pid: product?._id, color: product?.color || 'BLACK' })
            .then((res) => {
               messageApi.open({
                  type: 'success',
                  content: 'The product has been added to cart',
               });
               dispatch(getCurrent());
            })
            .catch((err) => {
               console.log(err);
            });
         return;
      }
      messageApi.open({
         type: 'warning',
         content: 'Please login!',
      });
   };

   return (
      <div className={`flex justify-${justify} gap-3 w-full`}>
         {contextHolder}
         <span className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-slate-50 hover:bg-slate-800 hover:text-white border cursor-pointer">
            <CiHeart className="text-[18px]" />
         </span>
         {userInfo?.cart?.some((el) => el.product._id === product?._id) ? (
            <span className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-green-500 text-white border cursor-pointer">
               <BsCartCheck />
            </span>
         ) : (
            <span
               className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-slate-50 hover:bg-slate-800 hover:text-white border cursor-pointer"
               onClick={handleAddToCart}
            >
               <BsCart className="text-[18px]" />
            </span>
         )}
         <span className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-slate-50 hover:bg-slate-800 hover:text-white border cursor-pointer">
            <IoEyeOutline className="text-[18px]" />
         </span>
      </div>
   );
}
export default memo(SelectOption);
