import React from "react";
import { Route, Routes } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h2>Login</h2>} />
        <Route path="/dashboard" element={<h2>Dashboard</h2>} />
      </Routes>
    </div>
  );
}
