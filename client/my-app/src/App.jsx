import "./App.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AdminLayout from "./components/layouts/AdminLayout/AdminLayout";

import { publicRouter } from "./routes/routes";
import { Fragment } from "react";

function App() {
  return (
    <div className="font-popin">
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
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
