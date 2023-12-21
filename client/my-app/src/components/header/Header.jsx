import React from 'react';

import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
   const { userInfo } = useSelector((state) => state.user);
   return (
      <div className="wrapper">
         <div className="py-[35px] flex justify-between">
            <div className="w-[25%]">
               <Link to={'/'}>
                  <img src={logo} alt="logo" />
               </Link>
            </div>
            <div className="pl-[25px] flex items-center justify-end">
               <div className="px-[20px] min-h-[40px]">
                  <div className="text-[13px] font-semibold uppercase leading-[0px] tracking-wider">
                     <i
                        className="fa fa-phone mr-[10px] text-main_color"
                        aria-hidden="true"
                     ></i>
                     (+1800) 000 8808
                  </div>
                  <div className="text-[12px] text-center">
                     Mon-Sat 9:00AM - 8:00PM
                  </div>
               </div>
               <div className="px-[20px] min-h-[40px] border-l">
                  <div className="text-[13px] font-semibold uppercase leading-[0px] tracking-wider">
                     <i
                        className="fa fa-envelope mr-[10px] text-main_color"
                        aria-hidden="true"
                     ></i>
                     SUPPORT@TADATHEMES.COM
                  </div>
                  <div className="text-[12px] text-center">
                     Online Support 24/7
                  </div>
               </div>
               <div className="flex items-center pl-[20px] min-h-[40px] border-l">
                  <ul className="flex items-center justify-between h-full w-full">
                     <li className="h-full">
                        <Link to="/cart" className="">
                           <span className="mr-[8px]">
                              <i
                                 className="fa fa-shopping-bag text-[20px] text-main_color"
                                 aria-hidden="true"
                              ></i>
                           </span>
                           <span>
                              <span className="text-[14px]">
                                 {userInfo?.cart?.length || 0}
                              </span>
                              <span className="ml-1 text-[14px]">item</span>
                           </span>
                        </Link>
                     </li>
                     {userInfo && (
                        <li className="ml-[20px] border-l flex-1 h-full flex justify-center items-center">
                           <Link
                              to={
                                 userInfo?.role === 229
                                    ? '/admin/dashboard'
                                    : '/account'
                              }
                              className="flex items-center"
                           >
                              <img
                                 className="w-[35px] rounded-full"
                                 src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                                 alt=""
                              />
                              <span>Profile</span>
                           </Link>
                        </li>
                     )}
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
}
