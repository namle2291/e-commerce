import React, { memo, useCallback, useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useParams, useSearchParams } from "react-router-dom";
import { httpRequest } from "../../axios/custom-axios";
import NewArrivalProduct from "../../components/Product/NewArrivalProduct";
import SearchItem from "../../components/SearchItem/SearchItem";
import { getProductCategory } from "../../apis/productApi";

function ProductCategory() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [activeClick, setActiveClick] = useState(null);

  const { cid } = useParams();

  const [params] = useSearchParams();

  const fetchProductsByCategory = async (queries) => {
    const response = await getProductCategory(queries);
    if (response.data.length > 0) {
      setProducts(response.data);
      setCategory(response.data[0].category.title);
    } else {
      setProducts([]);
    }
  };

  useEffect(() => {
    let param = [];

    for (let entry of params.entries()) {
      param.push(entry);
    }
    let queries = {};
    for (let i of param) {
      queries[i[0]] = i[1];
    }
    queries["category"] = cid;

    fetchProductsByCategory(queries);
  }, [params]);

  const handleChangeActiveClick = useCallback(
    (name) => {
      if (activeClick === name) {
        setActiveClick(null);
      } else {
        setActiveClick(name);
      }
    },
    [activeClick]
  );

  return (
    <div>
      <div className="bg-gray-100">
        <Breadcrumb
          isUpperCase={true}
          category={
            category
              ? category[0].toUpperCase() + category.slice(1)
              : "Products"
          }
        />
      </div>
      <div className="my-[15px] py-[10px] wrapper">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-9">
            <p className="mb-[5px]">Filter by</p>
            <div className="flex gap-1">
              <SearchItem
                name="Price"
                type="input"
                activeClick={activeClick}
                changeActiveClick={handleChangeActiveClick}
              />
              <SearchItem
                name="Color"
                type="checkbox"
                activeClick={activeClick}
                changeActiveClick={handleChangeActiveClick}
              />
            </div>
          </div>
          <div className="col-span-3">
            <p className="mb-[5px]">Sort by</p>
            <SearchItem
              name="Best Selling"
              type="sort"
              activeClick={activeClick}
              changeActiveClick={handleChangeActiveClick}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 wrapper mt-[20px]">
        {products &&
          products.map((item, index) => (
            <div className="" key={index}>
              <NewArrivalProduct data={item} isNew={true} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default memo(ProductCategory);
