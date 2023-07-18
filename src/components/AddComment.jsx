import { useState } from "react";
import "../../src/App.css";

const AddComment = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(comment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
        <h2>Post a comment:</h2>
      <textarea
      name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter your comment..."
        required
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddComment;
