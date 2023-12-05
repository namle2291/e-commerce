import React, { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent, logout } from "../../app/reducers/userReducer";
import LoadingCircle from "../Loading/LoadingCircle";

function TopHeader() {
  const { isLogged, userInfo, isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isLogged) {
  //     dispatch(getCurrent());
  //   }
  // }, []);

  return (
    <div className="py-[10px] bg-main_color text-white">
      <div className="wrapper flex justify-between text-[12px]">
        <div>
          <ul className="flex items-center">
            <li className="pr-[10px]">
              ORDER ONLINE OR CALL US (+1800) 000 8808
            </li>
            <li className="px-[10px] border-l border-l-[rgba(255,255,255,.4)]">
              <i className="fa fa-money" aria-hidden="true"></i> VND
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex items-center">
            {isLogged ? (
              <>
                <li className="px-[10px]">
                  <span>
                    {"Welcome! " +
                      userInfo?.first_name +
                      " " +
                      userInfo?.last_name}
                  </span>
                </li>
                <li
                  className="px-[10px] border-l border-l-[rgba(255,255,255,.4)] cursor-pointer"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </li>
              </>
            ) : (
              <li className="px-[10px]">
                <Link to={"/login"}>Sign In or Create Account</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default memo(TopHeader);
