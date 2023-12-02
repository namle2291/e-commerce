import React, { useEffect, useRef, useState } from "react";
import { IoMenu, IoStar } from "react-icons/io5";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";
import CountDown from "../CountDown/CountDown";
import { httpRequest } from "../../axios/custom-axios";
import Star from "../Star/Star";

export default function DailyDeal() {
  const [dateEnd, setDateEnd] = useState(new Date().getTime() + 10 * 1000);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [product, setProduct] = useState({});

  const timer = useRef();

  const fetchDailyProduct = () => {
    httpRequest
      .get("/products", {
        params: {
          page: Math.round(Math.random() * 10),
          limit: 1,
          totalRaitings: 5,
        },
      })
      .then((res) => {
        setProduct(res[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDailyProduct();
  }, []);

  // useEffect(() => {
  //   timer.current = setInterval(() => {
  //     fetchDailyProduct();
  //   }, 3000);
  //   return () => {
  //     clearInterval(timer.current);
  //   };
  // }, []);

  // useEffect(() => {
  //   fetchDailyProduct();
  //   timer.current = setInterval(() => {
  //     let now = new Date().getTime();
  //     let remaining = dateEnd - now;
  //     let hours = Math.floor(
  //       (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //     );
  //     let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  //     let seconds = Math.floor((remaining % (1000 * 60)) / 1000);
  //     setHours(hours);
  //     setMinutes(minutes);
  //     setSeconds(seconds);
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer.current);
  //   };
  // }, []);

  return (
    <>
      {product && (
        <div className="p-[20px]">
          <div className="flex items-center mb-[50px] text-[20px]">
            <span className="text-main_color">
              <IoStar />
            </span>
            <h2 className="ml-[50px] font-semibold ">DAILY DEALS</h2>
          </div>
          <div>
            <div className="w-[253px] h-[253px]">
              <img
                className="w-full h-full"
                src={product?.thumb}
                alt={product?.title}
              />
            </div>
            <div className="flex flex-col text-center gap-2">
              <span className="font-semibold">{product?.title}</span>
              <div className="flex justify-center">
                <Star totalRaitings={product.totalRaitings} fs={18} />
              </div>
              <span>{formatPrice(product?.price)} VND</span>
            </div>
            <div className="flex gap-2 mb-[15px]">
              <CountDown unit="Hours" number={hours} />
              <CountDown unit="Minutes" number={minutes} />
              <CountDown unit="Seconds" number={seconds} />
            </div>
            <Link>
              <div className="border py-[11px] px-[15px] bg-main_color text-white flex justify-center items-center gap-2">
                <span>
                  <IoMenu className="text-[18px]" />
                </span>
                <span>Options</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
