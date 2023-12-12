import "./App.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AdminLayout from "./components/layouts/AdminLayout/AdminLayout";

import { privateRouter, publicRouter } from "./routes/routes";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { persistor, store } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="font-popin">
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
              <Route path="admin/*" element={<AdminLayout />} />
            </Routes>
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
