import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Header from "../../header/Header";
import Navbar from "../../navbar/navbar";

function DefaultLayout() {
  return (
    <div className="">
      <Header />
      <Navbar />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<h2>Home page</h2>} />
          <Route path="/about" element={<h2>About page</h2>} />
          <Route path="/contact" element={<h2>Contact page</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default DefaultLayout;
