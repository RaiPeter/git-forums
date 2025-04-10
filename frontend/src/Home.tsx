import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

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
    <div>
      <div>
        <label htmlFor="forums">forums</label>
        <Link to={"/forum/new"}>New discussion</Link>
        {forums &&
          forums.map((forum) => (
            <Link key={forum.id} to={`/forum/${forum.id}`}>
              <h2>{forum.title}</h2>
              <p>{forum.description}</p>
              <p>{new Date(forum.created_at).toLocaleDateString()}</p>
              <p>{forum.username} asked</p>
              <div>
                {forum.user_id === user.id ? (
                  <>
                    <Link to={`/forum/${forum.id}/edit`}>edit</Link>
                    <button onClick={() => handleDelete(forum.id)}>
                      Delete
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
