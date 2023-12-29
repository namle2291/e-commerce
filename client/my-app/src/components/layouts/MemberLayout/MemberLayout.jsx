import { getCurrent } from 'app/reducers/userReducer';
import MemberSideBar from 'components/SideBar/MemberSideBar';
import React, { memo, useEffect, useRef } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MemberLayout = ({ children }) => {
   const dispatch = useDispatch();
   const timer = useRef();

   const { token } = useSelector((state) => state.user);

   useEffect(() => {
      timer.current = setTimeout(() => {
         if (token) {
            dispatch(getCurrent());
         }
      }, 300);
      return () => {
         clearTimeout(timer.current);
      };
   }, [dispatch, token]);

   return (
      <div className="flex bg-slate-50 min-h-screen relative">
         <div className="fixed top-0 bottom-0 lg:min-w-[327px] min-w-[300px] bg-slate-100">
            <MemberSideBar />
         </div>
         <div className="lg:min-w-[327px] min-w-[300px] shadow-lg"></div>
         <div className="flex-1">
            <div className="sticky top-0 z-50 p-4 border-b">
               <Link to={'/'} className="">
                  <span className="text-[20px]">
                     <AiOutlineHome />
                  </span>
               </Link>
            </div>
            <div className="p-4">{children}</div>
         </div>
      </div>
   );
};
export default memo(MemberLayout);
