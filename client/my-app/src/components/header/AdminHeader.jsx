import React, { useEffect, useRef } from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCurrent } from "../../app/reducers/userReducer";

export default function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timer = useRef();

  const { token, userInfo} = useSelector(
    (state) => state.user
  );

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
    <div className="p-4 flex items-center justify-between bg-zinc-800">
      <div>
        <Link to={"/"} className="">
          <span className="text-[20px]">
            <AiOutlineHome />
          </span>
        </Link>
      </div>
      <div>
        {userInfo && (
          <div className="flex items-center gap-1">
            <span className="text-[20px]">
              <AiOutlineUser />
            </span>
            <span>{userInfo?.first_name + " " + userInfo?.last_name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
