import React, { Fragment, memo, useState } from "react";
import logo_dark from "../../assets/img/logo_dark.png";
import { Link, NavLink } from "react-router-dom";
import { FaCaretDown, FaCaretLeft } from "react-icons/fa";
import { adminSidebars } from "../../utils/contants";
import clsx from "clsx";

const activedStyle = "bg-zinc-500";
const NotActivedStyle = "hover:bg-zinc-500";

function AdminSideBar() {
  const [actived, setActived] = useState([]);
  const [currentTab, setCurrentTab] = useState(1);

  const handleSetTab = (tabId) => {
    const tabActived = actived.find((el) => el === tabId);
    setCurrentTab(tabId);
    if (tabActived) {
      setActived((prev) => prev.filter((el) => el !== tabId));
    } else {
      setActived((prev) => [...prev, tabId]);
    }
  };

  return (
    <div>
      <div className="p-4">
        <img src={logo_dark} alt="logo" className="mx-auto" />
      </div>
      <div className="mt-[20px]">
        <ul>
          {adminSidebars &&
            adminSidebars.map((el) => (
              <Fragment key={el.id}>
                <li className="mb-1">
                  <NavLink
                    to={el.path}
                    className={({ isActive }) =>
                      clsx(
                        isActive && activedStyle,
                        !isActive && NotActivedStyle,
                        "w-full py-[15px] flex items-center justify-between gap-2 px-4"
                      )
                    }
                    onClick={() => {
                      if (el.childs) {
                        handleSetTab(el.id);
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[20px]">{el.icon}</span>
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
                {actived.some((id) => id === el.id) &&
                  el?.childs?.map((el) => (
                    <div key={el.id}>
                      <li className="mb-1">
                        <NavLink
                          to={el.path}
                          className={({ isActive }) =>
                            clsx(
                              isActive && activedStyle,
                              !isActive && NotActivedStyle,
                              "pl-9 w-full py-[15px] flex items-center justify-between gap-2 px-4"
                            )
                          }
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[20px]">{el.icon}</span>
                            <span>{el.title}</span>
                          </div>
                          {el.childs && (
                            <span>
                              <FaCaretDown />
                            </span>
                          )}
                        </NavLink>
                      </li>
                    </div>
                  ))}
              </Fragment>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default memo(AdminSideBar);
