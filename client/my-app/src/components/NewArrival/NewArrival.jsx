import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { httpRequest } from "../../axios/custom-axios";
import NewArrivalProduct from "../Product/NewArrivalProduct";

export default function NewArrival() {
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    httpRequest
      .get("/products", {
        params: {
          page: 1,
          limit: 10,
          totalRaitings: 5,
          sort: "-createdAt",
        },
      })
      .then((res) => {
        setNewArrivals(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="mb-[20px]">
        <h2 className="font-semibold text-[20px] uppercase py-[15px] border-b-2 border-b-red-600">
          New Arrivals
        </h2>
      </div>
      <div className="overflow-hidden">
        <Slider slidesToShow={3}>
          {newArrivals?.map((item, index) => (
            <div key={index}>
              <NewArrivalProduct data={item} isNew={true} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
