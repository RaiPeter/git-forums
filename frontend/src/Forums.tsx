import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import "./Forums.css";

interface Forums {
  id: number;
  title: string;
  description: string;
  user_id: number;
  created_at: string;
  username: string;
  email: string;
}

const Forums = () => {
  const [forums, setForums] = useState<Forums[]>([]);
  const navigate = useNavigate();
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
    <main>
      <div className="header">
        <label htmlFor="forums">Forums</label>
        <Link to={"/forums/new"}>Start New discussion</Link>
      </div>
      {forums &&
        forums.map((forum) => (
          <div key={forum.id} className="forums">
            <div className="card-body">
              <div className="card-header">
                <h2 onClick={() => navigate(`/forums/${forum.id}`)}>
                  {forum.title}
                </h2>
                {forum.user_id === user.id ? (
                  <div>
                    <button
                      onClick={() => navigate(`/forums/${forum.id}/edit`)}
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
                <p>
                  {new Date(forum.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
    </main>
  );
};

export default Forums;
