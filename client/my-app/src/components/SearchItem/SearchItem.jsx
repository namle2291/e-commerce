import React, { memo, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { colors } from "../../utils/contants";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { getHighPriceProduct } from "../../apis/productApi";
import { formatPrice } from "../../utils/formatPrice";
import { useDebounce } from "@uidotdev/usehooks";

function SearchItem({ name, activeClick, changeActiveClick, type }) {
  const [selected, setSelected] = useState([]);
  const [highPrice, setHighPrice] = useState(0);
  const [sort, setSort] = useState("");
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleSelect = (item) => {
    const itemExists = selected.find((el) => el === item);
    if (itemExists) {
      setSelected((prev) => prev.filter((el) => el !== item));
    } else {
      setSelected((prev) => [...prev, item]);
    }
    changeActiveClick(null);
  };

  const fetchHighPriceProduct = async () => {
    const response = await getHighPriceProduct({ sort: "-price" });
    if (response.data) {
      setHighPrice(response.data[0].price);
    }
  };

  useEffect(() => {
    if (selected.length > 0) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({
          color: selected.join(","),
        }).toString(),
      });
    } else {
      navigate({ pathname: location.pathname });
    }
  }, [selected]);

  useEffect(() => {
    if (type === "input") {
      fetchHighPriceProduct();
    }
  }, [type]);

  useEffect(() => {
    if (sort) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({
          sort,
        }).toString(),
      });
    }
  }, [sort]);

  const debounceFrom = useDebounce(price.from, 500);
  const debounceTo = useDebounce(price.to, 500);

  useEffect(() => {
    const data = {};
    if (Number(price.from) > 0) data["price[gte]"] = price.from;
    if (Number(price.to) > 0) data["price[lte]"] = price.to;
    navigate({
      pathname: location.pathname,
      search: createSearchParams(data).toString(),
    });
  }, [debounceFrom, debounceTo]);

  return (
    <div className="relative">
      <div
        className="border hover:border-gray-800 gap-4 pr-[30px] pl-[20px] flex items-center justify-between h-[45px]"
        onClick={() => changeActiveClick(name)}
      >
        <span className="text-sm">{name}</span>
        <span>
          <FaAngleDown />
        </span>
      </div>
      {activeClick === name && (
        <div className="absolute left-0 mt-1 bg-white border z-50 px-[15px] text-sm w-[350px]">
          {type === "checkbox" && (
            <>
              <div className="flex justify-between py-[30px] border-b">
                <span>{selected.length} Selected</span>
                <span
                  className="border-b border-black cursor-pointer"
                  onClick={() => setSelected([])}
                >
                  Reset
                </span>
              </div>
              <div className="py-[10px] overflow-y-auto max-h-[300px]">
                <>
                  {colors.map((item, index) => (
                    <label key={index} className="flex gap-2 items-center mb-3">
                      <input
                        type="checkbox"
                        value={item}
                        checked={selected.some((el) => el === item)}
                        onChange={(e) => handleSelect(e.target.value)}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </>
              </div>
            </>
          )}
          {type === "input" && (
            <>
              <div className="flex justify-between py-[30px] border-b">
                <span>The highest price is {formatPrice(highPrice)} VND</span>
                <span
                  className="border-b border-black cursor-pointer"
                  onClick={() => setSelected([])}
                >
                  Reset
                </span>
              </div>
              <div className="py-[10px] overflow-y-auto max-h-[300px] flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span>$</span>
                  <input
                    className="w-[130px] p-2"
                    placeholder="from"
                    type="text"
                    value={price.from}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, from: e.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span>$</span>
                  <input
                    className="w-[130px] p-2"
                    placeholder="to"
                    type="text"
                    value={price.to}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, to: e.target.value }))
                    }
                  />
                </div>
              </div>
            </>
          )}
          {type === "sort" && (
            <div className="flex flex-col">
              <div
                className="py-2 hover:text-blue-600 cursor-pointer"
                onClick={() => setSort("title")}
              >
                Alphabetically, A-Z
              </div>
              <div
                className="py-2 hover:text-blue-600 cursor-pointer"
                onClick={() => setSort("-title")}
              >
                Alphabetically, Z-A
              </div>
              <div
                className="py-2 hover:text-blue-600 cursor-pointer"
                onClick={() => setSort("price")}
              >
                Price, low to high
              </div>
              <div
                className="py-2 hover:text-blue-600 cursor-pointer"
                onClick={() => setSort("-price")}
              >
                Price, high to low
              </div>
              <div
                className="py-2 hover:text-blue-600 cursor-pointer"
                onClick={() => setSort("createdAt")}
              >
                Date, old to new
              </div>
              <div
                className="py-2 hover:text-blue-600 cursor-pointer"
                onClick={() => setSort("-createdAt")}
              >
                Date, new to old
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(SearchItem);
