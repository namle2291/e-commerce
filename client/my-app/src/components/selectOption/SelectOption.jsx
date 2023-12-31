import React, { memo } from 'react';

import { IoEyeOutline } from 'react-icons/io5';
import { BsCart, BsCartCheck } from 'react-icons/bs';
import { TbHeartCheck } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, updateCart } from '../../apis/userApi';
import { message } from 'antd';
import { getCurrent } from '../../app/reducers/userReducer';
import { setProductInfo, showQuickView } from '../../app/reducers/appReducer';
import { toast } from 'react-toastify';

function SelectOption({ product, justify = 'center' }) {
  const { userInfo } = useSelector((state) => state.user);
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (userInfo) {
      updateCart({
        pid: product?._id,
        color: product?.color || 'BLACK',
        price: product?.price,
        thumb: product?.thumb,
        title: product?.title,
        stock: product?.quantity,
      })
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

  const handleQuickView = () => {
    dispatch(showQuickView(true));
    dispatch(setProductInfo(product));
  };

  const handleAddToWishList = () => {
    addToWishList({ pid: product._id })
      .then((res) => {
        if (res.success) {
          dispatch(getCurrent());
        }
      })
      .catch((err) => {
        toast.warn(err.message);
      });
  };

  return (
    <div className={`flex justify-${justify} gap-3 w-full`}>
      {contextHolder}
      {userInfo?.wishlist?.some((el) => el.product._id === product?._id) ? (
        <span
          className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-red-600 text-white border cursor-pointer"
          onClick={handleAddToWishList}
        >
          <TbHeartCheck className="text-[18px]" />
        </span>
      ) : (
        <span
          className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-slate-50 hover:bg-slate-800 hover:text-white border cursor-pointer"
          onClick={handleAddToWishList}
        >
          <TbHeartCheck className="text-[18px]" />
        </span>
      )}
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
      <span
        className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-slate-50 hover:bg-slate-800 hover:text-white border cursor-pointer"
        onClick={() => handleQuickView()}
      >
        <IoEyeOutline className="text-[18px]" />
      </span>
    </div>
  );
}
export default memo(SelectOption);
