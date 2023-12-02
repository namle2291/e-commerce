import React from "react";

export default function TopHeader() {
  return (
    <div className="py-[10px] bg-main_color text-white">
      <div className="wrapper flex justify-between text-[12px]">
        <div>
          <ul className="flex items-center">
            <li className="pr-[10px]">
              ORDER ONLINE OR CALL US (+1800) 000 8808
            </li>
            <li className="px-[10px] border-l border-l-[rgba(255,255,255,.4)]">
              <i class="fa fa-money" aria-hidden="true"></i> VND
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex items-center">
            <li className="px-[10px]">Account</li>
            <li className="px-[10px] border-l border-l-[rgba(255,255,255,.4)]">
              <i class="fa fa-facebook" aria-hidden="true"></i>
            </li>
            <li className="px-[10px] border-l border-l-[rgba(255,255,255,.4)]">
              <i class="fa fa-twitter" aria-hidden="true"></i>
            </li>
            <li className="px-[10px] border-l border-l-[rgba(255,255,255,.4)]">
              <i class="fa fa-instagram" aria-hidden="true"></i>
            </li>
            <li className="px-[10px] border-l border-l-[rgba(255,255,255,.4)]">
              <i class="fa fa-google" aria-hidden="true"></i>
            </li>
            <li className="px-[10px] border-l border-l-[rgba(255,255,255,.4)]">
              <i class="fa fa-pinterest" aria-hidden="true"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
