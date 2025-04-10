import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Forum from "./Forum";
import NewForum from "./NewForum";
import ForumEdit from "./ForumEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Home />} />
        <Route path="/forum/:id" element={<Forum />} />
        <Route path="/forum/:id/edit" element={<ForumEdit />} />
        <Route path="/forum/new" element={<NewForum />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
