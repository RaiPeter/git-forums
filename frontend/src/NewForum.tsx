import axios from "axios";
import React, { useState } from "react";
import { redirect } from "react-router";

const NewForum = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your new forum logic here
    try {
      const { data } = await axios.post("http://localhost:3000/posts", {
        title,
        description,
      });

      console.log("New forum created:", data);
      redirect("/");
    } catch (error) {
      console.error("Error creating forum:", error);
    }
  };
  return (
    <div>
      <h1>New Forum</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Create Forum</button>
      </form>
    </div>
  );
};

export default NewForum;
