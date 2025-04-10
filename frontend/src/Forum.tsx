import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

interface Forum {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

const Forum = () => {
  // read param from url
  const params = useParams();
  const [forum, setForum] = useState<Forum | null>(null);

  useEffect(() => {
    const fetchForum = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/posts/${params.id}`
        );

        console.log("Forum data:", data);
        setForum(data);
      } catch (error) {
        console.error("Error fetching forum:", error);
      }
    };
    fetchForum();
  }, []);
  return (
    <div>
      <h1>Forum</h1>
      {forum && (
        <div key={forum.id}>
          <h2>{forum.title}</h2>
          <p>{forum.description}</p>
          <p>{new Date(forum.created_at).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default Forum;
