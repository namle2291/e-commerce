import React, { Fragment, memo, useState } from 'react';
import logo from '../../assets/img/logo.png';
import { NavLink } from 'react-router-dom';
import { FaCaretDown, FaCaretLeft } from 'react-icons/fa';
import { adminSidebars } from '../../utils/contants';
import clsx from 'clsx';

const activedStyle = 'bg-slate-200';
const NotActivedStyle = 'hover:bg-slate-200 transition-all';

function AdminSideBar() {
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
         <div className="p-4 sticky top-0">
            <img src={logo} alt="logo" className="mx-auto" />
         </div>
         <div className="mt-[20px]">
            <ul>
               {adminSidebars &&
                  adminSidebars.map((el) => (
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
                                 {el.childs && (
                                    <span>
                                       {actived.some((id) => id === el.id) ? (
                                          <FaCaretDown />
                                       ) : (
                                          <FaCaretLeft />
                                       )}
                                    </span>
                                 )}
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
                              {actived.some((id) => id === el.id) &&
                                 el?.childs?.map((el) => (
                                    <li key={el.id} className="mb-1">
                                       <NavLink
                                          to={el.path}
                                          className={({ isActive }) =>
                                             clsx(
                                                isActive && activedStyle,
                                                !isActive && NotActivedStyle,
                                                'pl-9 w-full py-[15px] flex items-center justify-between gap-2 px-4'
                                             )
                                          }
                                       >
                                          <div className="flex items-center gap-2">
                                             <span className="text-[20px]">
                                                {el.icon}
                                             </span>
                                             <span>{el.title}</span>
                                          </div>
                                          {el.childs && (
                                             <span>
                                                <FaCaretDown />
                                             </span>
                                          )}
                                       </NavLink>
                                    </li>
                                 ))}
                           </>
                        )}
                     </Fragment>
                  ))}
            </ul>
         </div>
      </div>
   );
}

export default memo(AdminSideBar);
