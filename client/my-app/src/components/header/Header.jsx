import React from "react";

export default function Header() {
  return (
    <div className="wrapper">
      <div className="py-[35px] flex">
        <div className="w-[25%]">
          <img
            src="	https://digital-world-2.myshopify.com/cdn/shop/files/logo_digital_new_250x.png?v=1613166683"
            alt=""
          />
        </div>
        <div className="w-[75%] pl-[25px] flex items-center justify-end">
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
            <div className="text-[12px] text-center">Online Support 24/7</div>
          </div>
          <div className="flex items-center pl-[20px] min-h-[40px] w-[157px] border-l">
            <ul className="flex items-center justify-between h-full w-full">
              <li className="h-full">
                <a href="/" className="">
                  <span className="mr-[8px]">
                    <i
                      className="fa fa-shopping-bag text-[20px] text-main_color"
                      aria-hidden="true"
                    ></i>
                  </span>
                  <span>
                    <span className="text-[14px]">1</span>
                    <span className="ml-1 text-[14px]">item</span>
                  </span>
                </a>
              </li>
              <li className="ml-[20px] min-h-[40px] border-l pl-[20px] flex-1 h-full flex items-center">
                <a href="/">
                  <img
                    width={35}
                    src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                    alt=""
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
