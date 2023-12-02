import React, { useEffect, useState } from "react";
import Collection from "../Collection/Collection";
import { httpRequest } from "../../axios/custom-axios";

export default function HotCollection() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    httpRequest
      .get("/categories", {
        params: { page: 1, limit: 6 },
      })
      .then((res) => {
        setCollections(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="mb-[20px]">
        <h2 className="font-semibold text-[20px] uppercase py-[15px] border-b-2 border-b-red-600">
          Hot Collections
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-5 border">
        {collections &&
          collections.map((item, index) => (
            <Collection key={index} data={item} />
          ))}
      </div>
    </div>
  );
}
