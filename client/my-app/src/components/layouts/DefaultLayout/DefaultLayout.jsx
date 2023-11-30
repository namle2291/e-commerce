import React from "react";
import Header from "../../header/Header";
import Navbar from "../../navbar/Navbar";
import Banner from "../../banner/Banner";
import SideBar from "../../sidebar/SideBar";

function DefaultLayout({ children }) {
  return (
    <div className="">
      <Header />
      <Navbar />
      <div className="wrapper flex my-[20px]">
        <div className="min-w-[293px] border">
          <SideBar />
        </div>
        <div className="flex-1 border pl-[20px]">
          <Banner />
        </div>
      </div>
      <div className="wrapper flex mb-[20px]">
        <div className="min-w-[293px] border">DAILY DEALS</div>
        <div className="flex-1 border pl-[20px]">BEST SELLER </div>
      </div>
      <div className="wrapper">{children}</div>
    </div>
  );
}

export default DefaultLayout;
