import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

const ForumEdit = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [forum, setForum] = useState<string | null>(null);
  const navigate = useNavigate();
  const params = useParams();

  const user = useSelector((state: any) => state.auth.user.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your new forum logic here
    try {
      const { data } = await axios.put(
        `http://localhost:3000/posts/${params.id}`,
        {
          title,
          description,
          user_id: user.id,
        }
      );

      console.log("New forum created:", data);
      navigate("/");
    } catch (error) {
      console.error("Error creating forum:", error);
    }
  };

  const fetchForum = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/posts/${params.id}`
      );

      console.log("Forum data:", data);
      setForum(data["post"]);
      setTitle(data["post"].title);
      setDescription(data["post"].description);
    } catch (error) {
      console.error("Error fetching forum:", error);
    }
  };

  useEffect(() => {
    fetchForum();
  }, []);
  return (
    <div>
      <h1>Edit Forum</h1>
      <form onSubmit={handleSubmit}>
        {forum && (
          <div>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button type="submit">Edit Forum</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ForumEdit;
