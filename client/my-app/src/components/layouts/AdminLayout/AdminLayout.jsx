import React, { Fragment } from 'react';
import { privateRouter } from '../../../routes/routes';
import AdminSideBar from '../../SideBar/AdminSideBar';
import AdminHeader from '../../Header/AdminHeader';
import { Route, Routes } from 'react-router-dom';

export default function AdminLayout() {
   return (
      <div className="flex bg-slate-50 min-h-screen relative">
         <div className="fixed top-0 bottom-0 lg:min-w-[327px] min-w-[300px] bg-slate-100">
            <AdminSideBar />
         </div>
         <div className="lg:min-w-[327px] min-w-[300px] shadow-lg"></div>
         <div className="flex-1">
            <div className="sticky top-0 shadow-md z-50">
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
