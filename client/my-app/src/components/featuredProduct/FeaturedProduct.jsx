import React, { useEffect, useState } from "react";
import { httpRequest } from "../../axios/custom-axios";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";
import Star from "../Star/Star";

export default function FeaturedProduct() {
  const [featuredProducts, setFeaturedProduct] = useState([]);

  useEffect(() => {
    httpRequest
      .get("/products", {
        params: { page: 1, limit: 9 },
      })
      .then((res) => {
        setFeaturedProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="mb-[20px]">
        <h2 className="font-semibold text-[20px] uppercase py-[15px] border-b-2 border-b-red-600">
          Featured Product
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {featuredProducts &&
          featuredProducts.map((item, index) => (
            <div key={index} className="border p-[15px] flex items-center">
              <Link
                to={`/product/${item._id}`}
                className="w-[81px] h-[81px] mr-[20px]"
              >
                <img
                  src={item.thumb}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </Link>
              <div>
                <Link
                  to={`/product/${item._id}`}
                  className="hover:text-main_color"
                >
                  <span>{item.title}</span>
                </Link>
                <Star totalRaitings={item.totalRaitings} />
                <span className="text-[13px]">
                  {formatPrice(item.price)} VND
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
