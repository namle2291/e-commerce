import React from "react";

export default function Footer() {
  return (
    <div>
      <div className="bg-main_color py-[25px]">
        <div className="wrapper grid grid-cols-2">
          <div>
            <div className="text-white">SIGN UP TO NEWSLETTER</div>
            <div className="text-gray-200 text-[13px]">
              Subscribe now and receive weekly newsletter
            </div>
          </div>
          <div className="relative rounded-3xl bg-[rgba(255,255,255,.2)]">
            <input
              type="text"
              placeholder="email address"
              className="w-full h-full font-open_sans placeholder-white  text-white outline-none py-[10px] px-[20px] bg-transparent"
            />
            <div className="absolute right-0 top-0 bottom-0 flex items-center text-white px-[25px]">
              <span>
                <i class="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black py-[50px]">
        <div className="wrapper grid grid-cols-12 text-white">
          <div className="col-span-5">
            <div className="pl-[15px] mb-[20px] border-l-4 border-l-red-700">
              ABOUT US
            </div>
            <ul className="text-[13px]">
              <li className="mb-[10px]">
                <span className="w-[20px] inline-block text-center mr-2">
                  <i className="fa fa-map-marker"></i>
                </span>
                <strong>Address</strong>:
                <span className="text-gray-300">
                  {" "}
                  Hong Ngu district, Dong Thap province
                </span>
              </li>
              <li className="mb-[10px]">
                <span className="w-[20px] inline-block text-center mr-2">
                  <i className="fa fa-phone"></i>
                </span>
                <strong>Phone: </strong>
                <span className="text-gray-300"> (+84) 354xxxxxx</span>
              </li>
              <li className="mb-[10px]">
                <span className="w-[20px] inline-block text-center mr-2">
                  <i className="fa fa-envelope"></i>
                </span>
                <strong>Mail: </strong>
                <span className="text-gray-300"> lnam6507@gmail.com</span>
              </li>
            </ul>
          </div>
          <div className="col-span-7">
            <div className="grid grid-cols-3">
              <div>
                <div className="pl-[15px] mb-[20px] border-l-4 border-l-red-700">
                  INFORMATION
                </div>
                <ul className="text-[13px]">
                  <li className="mb-[10px]">
                    <span className="text-gray-300">Typography</span>
                  </li>
                  <li className="mb-[10px]">
                    <span className="text-gray-300">Gallery</span>
                  </li>
                  <li className="mb-[10px]">
                    <span className="text-gray-300">Store Location</span>
                  </li>
                  <li className="mb-[10px]">
                    <span className="text-gray-300">Today's Deals</span>
                  </li>
                  <li className="mb-[10px]">
                    <span className="text-gray-300">Contact</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="pl-[15px] mb-[20px] border-l-4 border-l-red-700">
                  INFORMATION
                </div>
                <ul className="text-[13px]">
                  <li className="mb-[10px]">
                    <span className="text-gray-300">Help</span>
                  </li>
                  <li className="mb-[10px]">
                    <span className="text-gray-300">Free Shipping</span>
                  </li>
                  <li className="mb-[10px]">
                    <span className="text-gray-300">FAQS</span>
                  </li>
                  <li className="mb-[10px]">
                    <span className="text-gray-300">Return & Exchange</span>
                  </li>
                  <li className="mb-[10px]">
                    <span className="text-gray-300">Testimonials</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="pl-[15px] mb-[20px] border-l-4 border-l-red-700">
                  #DIGITALWORLDSTORE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
