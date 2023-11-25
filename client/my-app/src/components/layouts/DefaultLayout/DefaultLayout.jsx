import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Header from "../../header/Header";

function DefaultLayout() {
  return (
    <div className="w-[1220px] mx-auto px-[20px]">
      <Header/>
      <nav className="flex gap-2">
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h2>Home page</h2>} />
        <Route path="/about" element={<h2>About page</h2>} />
        <Route path="/contact" element={<h2>Contact page</h2>} />
      </Routes>
    </div>
  );
}

export default DefaultLayout;
