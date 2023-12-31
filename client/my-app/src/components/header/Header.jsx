import React, { useEffect, useRef, useState } from 'react';

import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'app/reducers/userReducer';

export default function Header() {
   const { userInfo } = useSelector((state) => state.user);
   const [showProfile, setShowProfile] = useState(false);
   const dispatch = useDispatch();
   const profileRef = useRef();

   useEffect(() => {
      const handleClickoutOptions = (e) => {
         if (!profileRef?.current?.contains(e.target)) setShowProfile(false);
      };

      document.addEventListener('click', handleClickoutOptions);

      return () => {
         document.removeEventListener('click', handleClickoutOptions);
      };
   }, []);

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
                        <Link to="/member/my-cart" className="">
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
                        <li
                           ref={profileRef}
                           className="ml-[20px] border-l pl-[5px] flex-1 h-full flex gap-2 justify-center items-center relative cursor-pointer"
                           onClick={() => setShowProfile((prev) => !prev)}
                        >
                           <div className="w-[35px] h-[35px] rounded-full overflow-hidden">
                              <img
                                 className="w-full h-full object-cover"
                                 src={userInfo?.avatar}
                                 alt="avatar"
                              />
                           </div>
                           <span>Profile</span>
                           {showProfile && (
                              <div
                                 className="absolute flex flex-col border top-full left-0 bg-slate-50 z-50 w-[200px]"
                                 onClick={(e) => e.stopPropagation()}
                              >
                                 <Link
                                    to={'/member/personal'}
                                    className="px-3 py-2 cursor-pointer"
                                 >
                                    Personal
                                 </Link>
                                 {userInfo.role === 229 && (
                                    <Link
                                       to={'/admin/dashboard'}
                                       className="px-3 py-2 cursor-pointer"
                                    >
                                       Admin workspace
                                    </Link>
                                 )}
                                 <div
                                    className="px-3 py-2 cursor-pointer"
                                    onClick={() => dispatch(logout())}
                                 >
                                    Logout
                                 </div>
                              </div>
                           )}
                        </li>
                     )}
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
}
