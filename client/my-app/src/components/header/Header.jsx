import React from "react";

export default function Header() {
  return (
    <div className="py-[35px] flex">
      <div className="w-[25%]">
        <img
          src="	https://digital-world-2.myshopify.com/cdn/shop/files/logo_digital_new_250x.png?v=1613166683"
          alt=""
        />
      </div>
      <div className="w-[75%] pl-[25px] flex items-center justify-end">
        <div className="px-[20px] h-[40px]">
          <div className="text-[13px] font-semibold uppercase leading-[0px] tracking-wider">
            <i className="fa fa-phone mr-[10px] text-main_color" aria-hidden="true"></i>
            (+1800) 000 8808
          </div>
          <div className="text-[12px] text-center">Mon-Sat 9:00AM - 8:00PM</div>
        </div>
        <div className="px-[20px] h-[40px] border-l">
          <div className="text-[13px] font-semibold uppercase leading-[0px] tracking-wider">
            <i className="fa fa-envelope mr-[10px] text-main_color" aria-hidden="true"></i>
            SUPPORT@TADATHEMES.COM
          </div>
          <div className="text-[12px] text-center">Online Support 24/7</div>
        </div>
        <div className="flex items-center pl-[20px] h-[40px] w-[157px] border-l">
          <ul className="flex items-center justify-between h-full w-full">
            <li className="h-full pt-[10px]">
              <a href="/">
                <span>
                  <i
                    className="fa fa-heart-o text-[20px] text-main_color"
                    aria-hidden="true"
                  ></i>
                </span>
              </a>
            </li>
            <li className="ml-[20px] pt-[10px] pl-[20px] min-h-[40px]  border-l flex-1">
              <a href="/" className="">
                <span className="mr-[8px]">
                  <i
                    className="fa fa-shopping-bag text-[20px]  text-main_color"
                    aria-hidden="true"
                  ></i>
                </span>
                <span className="">
                  <span className="text-[14px]">1</span>
                  <span className="ml-1 text-[14px]">item</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
