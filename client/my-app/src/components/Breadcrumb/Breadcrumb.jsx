import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ category = "", product = "", isUpperCase = false }) {
  return (
    <div className="py-[15px] mb-[20px] wrapper">
      <h3
        className={`font-semibold mb-[10px] ${isUpperCase ? "uppercase" : ""}`}
      >
        {product || category}
      </h3>
      <nav className="text-[14px] flex items-center gap-1 text-gray-500">
        <Link to={"/"} className="hover:text-main_color">
          Home
        </Link>
        <span>{">"}</span>
        <Link className="hover:text-main_color">{category}</Link>
        {product && (
          <>
            <span>{">"}</span>
            <span>{product}</span>
          </>
        )}
      </nav>
    </div>
  );
}

export default Breadcrumb;
