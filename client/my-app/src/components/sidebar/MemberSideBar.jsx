import React, { Fragment, memo, useState } from 'react';
import user_avatar_default from '../../assets/img/user_avatar_default.png';
import { NavLink } from 'react-router-dom';
import { FaCaretDown, FaCaretLeft } from 'react-icons/fa';
import { memberSidebars } from '../../utils/contants';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

const activedStyle = 'bg-slate-200';
const NotActivedStyle = 'hover:bg-slate-200 transition-all';

function MemberSideBar() {
   const { userInfo } = useSelector((state) => state.user);
   const [actived, setActived] = useState([]);

   const handleSetTab = (tabId) => {
      const tabActived = actived.find((el) => el === tabId);
      if (tabActived) {
         setActived((prev) => prev.filter((el) => el !== tabId));
      } else {
         setActived((prev) => [...prev, tabId]);
      }
   };

   return (
      <div className="h-full">
         <div className="p sticky top-0 flex flex-col items-center py-2">
            <div className="w-[80px] h-[80px] overflow-hidden rounded-full border">
               <img
                  src={userInfo ? userInfo?.avatar : user_avatar_default}
                  className="w-full h-full object-cover"
                  alt="avatar"
               />
            </div>
            <h2>{`${userInfo?.first_name} ${userInfo?.last_name}`}</h2>
         </div>
         <div className="mt-[10px]">
            <ul>
               {memberSidebars &&
                  memberSidebars.map((el) => (
                     <Fragment key={el.id}>
                        {el.type === 'normal' && (
                           <li className="mb-1">
                              <NavLink
                                 to={el.path}
                                 className={({ isActive }) =>
                                    clsx(
                                       isActive && activedStyle,
                                       !isActive && NotActivedStyle,
                                       'w-full py-[15px] flex items-center justify-between gap-2 px-4'
                                    )
                                 }
                              >
                                 <div className="flex items-center gap-2">
                                    <span className="text-[20px]">
                                       {el.icon}
                                    </span>
                                    <span>{el.title}</span>
                                 </div>
                              </NavLink>
                           </li>
                        )}
                        {el.type === 'parent' && (
                           <>
                              <li className="mb-1">
                                 <NavLink
                                    className={({ isActive }) =>
                                       clsx(
                                          NotActivedStyle,
                                          'w-full py-[15px] flex items-center justify-between gap-2 px-4'
                                       )
                                    }
                                    onClick={() => handleSetTab(el.id)}
                                 >
                                    <div className="flex items-center gap-2">
                                       <span className="text-[20px]">
                                          {el.icon}
                                       </span>
                                       <span>{el.title}</span>
                                    </div>
                                    {el.childs && (
                                       <span>
                                          {actived.some(
                                             (id) => id === el.id
                                          ) ? (
                                             <FaCaretDown />
                                          ) : (
                                             <FaCaretLeft />
                                          )}
                                       </span>
                                    )}
                                 </NavLink>
                              </li>
                           </>
                        )}
                     </Fragment>
                  ))}
            </ul>
         </div>
      </div>
   );
}

export default memo(MemberSideBar);
