import axios from "axios";
import React, { useState, FC } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

interface CommentsProps {
  onCommentSubmit: () => void;
}

const Comments: FC<CommentsProps> = ({ onCommentSubmit }) => {
  const [addComment, setAddComment] = useState<string>("");
  const params = useParams();
  const user = useSelector((state: any) => state.auth.user.user);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`http://localhost:3000/comments`, {
        post_id: params.id,
        user_id: user.id,
        content: addComment,
      });
      console.log("Comment submitted:", data);
      setAddComment("");
      onCommentSubmit();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  return (
    <div>
      <h3>Add a comment</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            required
            value={addComment}
            onChange={(e) => setAddComment(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Comments;
