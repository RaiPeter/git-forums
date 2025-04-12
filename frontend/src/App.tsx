import { BrowserRouter, Routes, Route } from "react-router";

import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Forum from "./Forum";
import NewForum from "./NewForum";
import ForumEdit from "./ForumEdit";
import Forums from "./Forums";
import History from "./History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="forums" element={<Home />}>
          <Route index element={<Forums />} />
          <Route path="/forums/:id" element={<Forum />} />
          <Route path="/forums/:id/edit" element={<ForumEdit />} />
          <Route path="/forums/new" element={<NewForum />} />
          <Route path="/forums/history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
