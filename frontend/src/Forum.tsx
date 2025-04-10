import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Comments from "./components/Comments";

interface Forum {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
}

const Forum = () => {
  // read param from url
  const params = useParams();
  const [forum, setForum] = useState<Forum | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchForum = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/posts/${params.id}`
      );

      console.log("Forum data:", data);
      console.log("Forum data:", typeof data);
      setForum(data["post"]);
      setComments(data["comments"]);
    } catch (error) {
      console.error("Error fetching forum:", error);
    }
  };

  useEffect(() => {
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
          <div>
            {comments.map((comment) => (
              <div key={comment.id}>
                <p>{comment.content}</p>
                <p>{new Date(comment.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
          <Comments onCommentSubmit={fetchForum} />
        </div>
      )}
    </div>
  );
};

export default Forum;
