import './App.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminLayout from './components/layouts/AdminLayout/AdminLayout';

import { publicRouter } from './routes/routes';
import { Fragment, memo } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import QuickView from './components/QuickView/QuickView';
import Member from 'pages/clients/Member';
import NotFound from 'pages/notfound/NotFound';
import MemberLayout from 'components/layouts/MemberLayout/MemberLayout';

function App() {
   const { isLogged } = useSelector((state) => state.user);
   return (
      <div className="font-popin relative">
         <ToastContainer />
         <Router>
            <Routes>
               {publicRouter &&
                  publicRouter.map((item, index) => {
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
               <Route
                  path="admin/*"
                  element={
                     <ProtectedRoute isLogged={isLogged}>
                        <AdminLayout />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/member/*"
                  element={
                     <MemberLayout>
                        <Routes>
                           <Route path="/personal" element={<Member />} />
                           <Route path="/*" element={<NotFound />} />
                        </Routes>
                     </MemberLayout>
                  }
               ></Route>
            </Routes>
         </Router>
         <QuickView />
      </div>
   );
}

export default memo(App);
