import React from "react";
import Header from "../../Header/Header";
import Navbar from "../../NavBar/Navbar";
import TopHeader from "../../TopHeader/TopHeader";

function DefaultLayout({ children }) {
  return (
    <div>
      <TopHeader />
      <Header />
      <Navbar />
      <div className="wrapper">{children}</div>
    </div>
  );
}

export default DefaultLayout;
