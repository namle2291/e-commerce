import React from "react";
import Header from "../../header/Header";
import Navbar from "../../navbar/Navbar";

export default function OnlyHeader({ children }) {
  return (
    <div className="">
      <Header />
      <Navbar />
      <div className="wrapper">{children}</div>
    </div>
  );
}
