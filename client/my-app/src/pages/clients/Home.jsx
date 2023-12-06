import React from "react";
import Banner from "../../components/Banner/Banner";
import SideBar from "../../components/SideBar/SideBar";
import BestSeller from "../../components/BestSeller/BestSeller";
import DailyDeal from "../../components/DailyDeal/DailyDeal";
import FeaturedProduct from "../../components/FeaturedProduct/FeaturedProduct";
import NewArrival from "../../components/NewArrival/NewArrival";
import HotCollection from "../../components/HotCollection/HotCollection";

function Home() {
  return (
    <div className="wrapper">
      <div className="flex my-[20px]">
        <div className="min-w-[293px] border">
          <SideBar />
        </div>
        <div className="flex-1 pl-[20px]">
          <Banner />
        </div>
      </div>
      <div className="flex mb-[20px]">
        <div className="min-w-[293px] border">
          <DailyDeal />
        </div>
        <div className="flex-1 pl-[20px] max-w-[887px]">
          <BestSeller />
        </div>
      </div>
      <div className="mb-[20px]">
        <FeaturedProduct />
      </div>
      <div className="grid grid-cols-4 gap-4 mb-[20px]">
        <div className="col-span-2 border">
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
            alt=""
          />
        </div>
        <div className="col-span-1 border flex flex-col justify-between gap-4">
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
            alt=""
          />
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
            alt=""
          />
        </div>
        <div className="col-span-1 border">
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
            alt=""
          />
        </div>
      </div>
      <div className="mb-[20px]">
        <NewArrival />
      </div>
      <div className="mb-[20px]">
        <HotCollection />
      </div>
    </div>
  );
}

export default Home;
