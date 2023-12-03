import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Product from "../Product/Product";
import { httpRequest } from "../../axios/custom-axios";

const tabs = [
  {
    id: 1,
    name: "BEST SELLER",
  },
  {
    id: 2,
    name: "NEW ARRIVALS",
  },
  {
    id: 3,
    name: "TABLET",
  },
];

var settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
};

export default function BestSeller() {
  const [tabActive, setTabActive] = useState(1);
  const [bestSeller, setBestSeller] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [tablets, setTablets] = useState([]);

  useEffect(() => {
    const response = Promise.all([
      httpRequest.get("/products", {
        params: { page: 1, limit: 10, totalRaitings: 5, sort: "-sold" },
      }),
      httpRequest.get("/products", {
        params: { page: 1, limit: 10, totalRaitings: 5, sort: "-createdAt" },
      }),
      httpRequest.get("/products", {
        params: {
          page: 1,
          limit: 10,
          // totalRaitings: 5,
          category: "656be9f43a736fa60d231797",
        },
      }),
    ]);
    response.then((res) => {
      if (res) {
        setBestSeller(res[0].data);
        setNewArrivals(res[1].data);
        setTablets(res[2].data);
      }
    });
  }, []);

  return (
    <div>
      <ul className="flex mb-[20px] pb-[15px] border-b-2 border-red-600">
        {tabs &&
          tabs.map((item, index) => (
            <li
              key={index}
              className={`text-[20px] cursor-pointer font-semibold
              ${index !== 0 ? "ml-[20px] pl-[20px]" : ""}
              ${tabActive === item.id ? "text-gray-950" : "text-gray-500"}
              `}
              onClick={() => setTabActive(item.id)}
            >
              {item.name}
            </li>
          ))}
      </ul>
      <div className="overflow-hidden">
        <Slider {...settings}>
          {tabActive === 1 &&
            bestSeller?.map((item, index) => (
              <div key={index}>
                <Product data={item} />
              </div>
            ))}
          {tabActive === 2 &&
            newArrivals?.map((item, index) => (
              <div key={index}>
                <Product data={item} isNew={true} />
              </div>
            ))}
          {tabActive === 3 &&
            tablets?.map((item, index) => (
              <div key={index}>
                <Product data={item} isNew={true} />
              </div>
            ))}
        </Slider>
      </div>
      <div className="flex gap-4">
        <div>
          <img
            className="w-full object-cover"
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-full object-cover"
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
