import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DefaultLayout from "./components/layouts/DefaultLayout/DefaultLayout";
import AdminLayout from "./components/layouts/AdminLayout/AdminLayout";

function App() {
  return (
    <div className="font-popin h-[1000px] border">
      <Router>
        <Routes>
          <Route path="/*" element={<DefaultLayout />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
