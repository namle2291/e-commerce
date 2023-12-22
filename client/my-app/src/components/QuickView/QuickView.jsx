import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Modal, message } from 'antd';
import { resetProductInfo, showQuickView } from '../../app/reducers/appReducer';
import Slider from 'react-slick';
import { formatPrice } from '../../utils/formatPrice';
import QuantityForm from '../Product/QuantityForm';
import { getCurrent } from '../../app/reducers/userReducer';
import { updateCart } from '../../apis/userApi';

function QuickView() {
   const { isShowQuickView, productInfo } = useSelector((state) => state.app);
   const { userInfo } = useSelector((state) => state.user);

   const [messageApi, contextHolder] = message.useMessage();
   const [productImage, setProductImage] = useState('');
   const [quantity, setQuantity] = useState(1);
   const dispatch = useDispatch();

   useEffect(() => {
      if (productInfo) {
         setProductImage(productInfo.thumb);
      }
   }, [productInfo]);

   const handleCancel = useCallback(() => {
      dispatch(showQuickView(false));
      dispatch(resetProductInfo());
      setQuantity(1);
   }, []);

   const handleIncrease = useCallback((num) => {
      setQuantity(num);
   }, []);

   const handleDecrease = useCallback((num) => {
      setQuantity(num);
   }, []);

   const handleChangeQuantity = useCallback((num) => {
      setQuantity(num);
   }, []);

   const handleAddToCart = () => {
      if (userInfo) {
         updateCart({
            pid: productInfo?._id,
            quantity,
            color: productInfo?.color || 'BLACK',
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

   return (
      <>
         {contextHolder}
         <Modal
            width={800}
            style={{ padding: '20px' }}
            centered={true}
            open={isShowQuickView}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={handleCancel}
         >
            <div className="grid grid-cols-2">
               <div className="flex flex-col">
                  <div className="w-[350px] h-[350px] flex items-center mb-[30px] duration-200 overflow-hidden">
                     <img
                        src={productImage ? productImage : productInfo.thumb}
                        alt="image_preview"
                        className="w-full object-contain"
                     />
                  </div>
                  {productInfo?.images?.length > 0 && (
                     <div className="w-full">
                        <Slider
                           slidesToShow={3}
                           infinite={false}
                           speed={1000}
                           afterChange={(index) =>
                              setProductImage(productInfo?.images[index])
                           }
                        >
                           {productInfo?.images?.map((item, index) => (
                              <div
                                 key={index}
                                 className="h-[100px] border cursor-pointer"
                                 onClick={() => setProductImage(item)}
                              >
                                 <img
                                    className="w-full h-full object-contain"
                                    key={index}
                                    src={item}
                                    alt={index}
                                 />
                              </div>
                           ))}
                        </Slider>
                     </div>
                  )}
               </div>
               <div className="flex justify-between flex-1 pl-[45px]">
                  <div className="flex-1">
                     <div className="mb-[20px]">
                        <span className="text-[20px] font-semibold">
                           {productInfo.title}
                        </span>
                     </div>
                     <div className="mt-[20px] mb-[20px]">
                        <ul className="list-disc pl-[20px]">
                           {productInfo?.description?.map((item, index) => (
                              <li
                                 key={index}
                                 className="text-[14px] text-gray-500"
                              >
                                 {item}
                              </li>
                           ))}
                        </ul>
                     </div>
                     <div className="mb-[20px]">
                        <span className="text-[20px] font-semibold">
                           {formatPrice(productInfo.price)} VND
                        </span>
                     </div>
                     <QuantityForm
                        min={1}
                        quantity={quantity}
                        max={productInfo.quantity}
                        increase={handleIncrease}
                        decrease={handleDecrease}
                        setQuantity={handleChangeQuantity}
                     />
                     <div>
                        <button
                           className="uppercase w-2/4 bg-main_color text-white px-[15px] py-[10px]"
                           onClick={handleAddToCart}
                        >
                           Add to cart
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </Modal>
      </>
   );
}

export default QuickView;
