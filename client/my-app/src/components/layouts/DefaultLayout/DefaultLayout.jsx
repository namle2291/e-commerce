import React from "react";
import Header from "../../Header/Header";
import Navbar from "../../NavBar/Navbar";
import TopHeader from "../../TopHeader/TopHeader";
import Footer from "../../Footer/Footer";

function DefaultLayout({ children }) {
  return (
    <div>
      <TopHeader />
      <Header />
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
