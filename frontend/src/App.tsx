import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import "./App.css";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* <Route index element={<DashboardHome />} />
        <Route path="add-property" element={<AddProperty />} />
        <Route path=":location">
          <Route index element={<LocationPage />} />
          <Route path="details" element={<PropertyDetails />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
