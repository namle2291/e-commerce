import React, { Fragment, useEffect, useLayoutEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRouter } from "../../../routes/routes";
import AdminSideBar from "../../SideBar/AdminSideBar";
import AdminHeader from "../../Header/AdminHeader";
import { useSelector } from "react-redux";

export default function AdminLayout() {
  const { isLogged, userInfo } = useSelector((state) => state.user);

  if (!isLogged) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex bg-zinc-900 min-h-screen relative text-white">
      <div className="fixed top-0 bottom-0 w-[327px] bg-zinc-800 border-r border-zinc-700">
        <AdminSideBar />
      </div>
      <div className="w-[327px]"></div>
      <div className="h-[1000px] flex-1">
        <div className="sticky top-0">
          <AdminHeader />
        </div>
        <div className="p-4">
          <Routes>
            {privateRouter &&
              privateRouter.map((item, index) => {
                let Element = item.element;
                let Layout = item.layout;

                if (Layout) {
                  Layout = item.layout;
                } else {
                  Layout = Fragment;
                }

                return (
                  <Route
                    path={item.path}
                    key={index}
                    element={
                      <Layout>
                        <Element />
                      </Layout>
                    }
                  />
                );
              })}
          </Routes>
        </div>
      </div>
    </div>
  );
}
