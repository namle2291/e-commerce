import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";
import { httpRequest } from "../../axios/custom-axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  const { category } = useParams();

  useEffect(() => {
    httpRequest
      .get("/products", {
        params: {
          category,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="bg-gray-200">
        <Breadcrumb
          isUpperCase={true}
          category={
            category
              ? category[0].toUpperCase() + category.slice(1)
              : "Products"
          }
        />
      </div>
    </div>
  );
}
