import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { logout } from "./features/slices/authReducer";
import "./Home.css";

interface Forums {
  id: number;
  title: string;
  description: string;
  user_id: number;
  created_at: string;
  username: string;
  email: string;
}

const Home = () => {
  const [forums, setForums] = useState<Forums[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user.user);
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      setForums((prevForums) => prevForums.filter((forum) => forum.id !== id));
      navigate("/");
    } catch (error) {
      console.error("Error deleting forum:", error);
    }
  };

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts");
        const data = response.data;
        console.log("Forums data:", data);
        setForums(data);
      } catch (error) {
        console.error("Error fetching forums:", error);
      }
    };
    fetchForums();
  }, []);
  return (
    <div>
      <nav>
        <div className="logo">
          <h1>Forum</h1>
        </div>
        <div className="links">
          <label htmlFor="">{user.username}</label>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <main>
        <div className="header">
          <label htmlFor="forums">Forums</label>
          <Link to={"/forum/new"}>Start New discussion</Link>
        </div>
        {forums &&
          forums.map((forum) => (
            <Link key={forum.id} to={`/forum/${forum.id}`}>
              <div className="card-body">
                <div className="card-header">
                  <h2>{forum.title}</h2>
                  {forum.user_id === user.id ? (
                    <div>
                      <button
                        onClick={() => navigate(`/forum/${forum.id}/edit`)}
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDelete(forum.id)}>
                        Delete
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="card-footer">
                  <p>{forum.username} asked on</p>
                  <p>{new Date(forum.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </Link>
          ))}
      </main>
    </div>
  );
};

export default Home;
