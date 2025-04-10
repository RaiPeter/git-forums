import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

interface Forums {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

const Home = () => {
  const [forums, setForums] = useState<Forums[]>([]);

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
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
