import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Comments from "./components/Comments";
import "./Forum.css";
import { FaArrowUp } from "react-icons/fa";

interface Forum {
  id: number;
  title: string;
  description: string;
  created_at: string;
  user_id: number;
  username: string;
  upvotesCount: number;
}

interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
  username: string;
  email: string;
}

const Forum = () => {
  // read param from url
  const params = useParams();
  const [forum, setForum] = useState<Forum | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const [hasUpvoted, setHasUpvoted] = useState<boolean>(false);

  const user = useSelector((state: any) => state.auth.user.user);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/comments/${id}`);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditClick = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
  };

  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditedContent("");
  };

  const handleEditSave = async () => {
    if (!editingCommentId) return;
    try {
      await axios.put(`http://localhost:3000/comments/${editingCommentId}`, {
        content: editedContent,
      });

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === editingCommentId
            ? { ...comment, content: editedContent }
            : comment
        )
      );

      setEditingCommentId(null);
      setEditedContent("");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleUpvote = async (forum_id: number) => {
    if (!forum || !user) return;
    try {
      if (hasUpvoted) {
        await axios.delete("http://localhost:3000/upvote", {
          data: {
            post_id: forum_id,
            user_id: user.id,
          },
        });

        setForum((prev) =>
          prev ? { ...prev, upvotesCount: prev.upvotesCount - 1 } : prev
        );

        setHasUpvoted(false);
      } else {
        await axios.post("http://localhost:3000/upvote", {
          post_id: forum_id,
          user_id: user.id,
        });

        setForum((prev) =>
          prev ? { ...prev, upvotesCount: prev.upvotesCount + 1 } : prev
        );
        setHasUpvoted(true);
      }
    } catch (err) {
      console.error("Upvote toggle failed:", err);
    }
  };

  const fetchForum = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/posts/${params.id}?user_id=${user.id}`
      );

      console.log("Forum data:", data);
      console.log("Forum data:", typeof data);
      console.log(typeof data["upvotesCount"]);
      console.log("Forum data:", data["upvotesCount"]);
      console.log("has upvoted:", data.hasUpvoted);

      setForum(data.post);
      setForum((prev) =>
        prev ? { ...prev, upvotesCount: data["upvotesCount"] } : null
      );
      setComments(data.comments);
      setHasUpvoted(data.hasUpvoted);
    } catch (error) {
      console.error("Error fetching forum:", error);
    }
  };

  useEffect(() => {
    fetchForum();
  }, [user.id, params.id]);

  return (
    <div>
      <div className="forum-container">
        <h2>discussion</h2>
        {forum && (
          <div key={forum.id} className="forum-card">
            <h2>{forum.title}</h2>
            <div className="forum-card-body">
              <div className="forum-card-header">
                <p>{forum.username} on</p>
                <p>
                  {new Date(forum.created_at).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <p>{forum.description}</p>
              <div
                onClick={() => handleUpvote(forum.id)}
                className="forum-upvotes"
              >
                <FaArrowUp color={hasUpvoted ? "orange" : "gray"} />{" "}
                {forum.upvotesCount}
              </div>
            </div>
          </div>
        )}
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            {editingCommentId === comment.id ? (
              <div className="comment-card-edit">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <br />
                <div>
                  <button onClick={handleEditSave}>Save</button>
                  <button onClick={handleEditCancel}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="comment-card-body">
                <div className="comment-card-header">
                  <div>
                    <p>{comment.username} replied on</p>
                    <p>
                      {new Date(comment.created_at).toLocaleDateString(
                        "en-us",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  {comment.user_id === user.id && (
                    <div>
                      <button onClick={() => handleEditClick(comment)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(comment.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <p>{comment.content}</p>
              </div>
            )}
          </div>
        ))}
        <Comments onCommentSubmit={fetchForum} />
      </div>
    </div>
  );
};

export default Forum;
