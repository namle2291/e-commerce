import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../../header/Header";
import Navbar from "../../navbar/navbar";

function DefaultLayout() {
  return (
    <div className="">
      <Header />
      <Navbar />
      <div className="wrapper flex mb-[20px]">
        <div className="min-w-[293px] border">Category</div>
        <div className="flex-1 border pl-[20px]">Slider</div>
      </div>
      <div className="wrapper flex mb-[20px]">
        <div className="min-w-[293px] border">DAILY DEALS</div>
        <div className="flex-1 border pl-[20px]">BEST SELLER </div>
      </div>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<h2>Home page</h2>} />
          <Route path="/blog" element={<h2>Blog page</h2>} />
          <Route path="/about" element={<h2>About page</h2>} />
          <Route path="/contact" element={<h2>Contact page</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default DefaultLayout;