import React from "react";
import Header from "../../header/Header";
import Navbar from "../../navbar/Navbar";

function DefaultLayout({ children }) {
  return (
    <div className="">
      <Header />
      <Navbar />
      <div className="wrapper">{children}</div>
    </div>
  );
}

export default DefaultLayout;
