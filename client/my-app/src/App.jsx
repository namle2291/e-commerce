import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AdminLayout from "./components/layouts/AdminLayout/AdminLayout";

import { publicRouter } from "./routes/routes";
import { Fragment } from "react";

function App() {
  return (
    <div className="font-popin h-[1000px] border">
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
