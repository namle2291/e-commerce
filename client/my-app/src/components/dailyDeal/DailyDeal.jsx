import React, { useEffect, useRef, useState } from "react";
import { IoMenu, IoStar } from "react-icons/io5";
import { renderStar } from "../../utils/renderStar";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";
import CountDown from "../CountDown/CountDown";
import { httpRequest } from "../../axios/custom-axios";

export default function DailyDeal() {
  const [dateEnd, setDateEnd] = useState(
    new Date().getTime() + 1 * 60 * 60 * 1000
  );
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const timer = useRef();

  const fetchDailyProduct = () => {
    httpRequest
      .get("/products")
      .then((res) => {
        //
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDailyProduct();
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => {
      let now = new Date().getTime();
      let remaining = dateEnd - now;

      let hours = Math.floor(
        (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return (
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
            src="https://digital-world-2.myshopify.com/cdn/shop/products/Untitled-189_400x.jpg?v=1491404918"
            alt=""
          />
        </div>
        <div className="flex flex-col text-center gap-2">
          <span className="font-semibold">Motorola Moto 360 (2nd gen)</span>
          <span className="text-yellow-400 flex justify-center mb-[15px]">
            {renderStar(5)}
          </span>
          <span>{formatPrice(9000000)} VND</span>
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
  );
}
