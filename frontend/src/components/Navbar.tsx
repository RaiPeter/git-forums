import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/slices/authReducer";
import { useNavigate } from "react-router";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user.user);
  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <nav>
      <div className="logo">
        <h1 onClick={() => navigate("/forums")}>Forum</h1>
      </div>
      <div className="links">
        <label htmlFor="">{user.username}</label>
        <button onClick={() => navigate("/forums/history")}>history</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
