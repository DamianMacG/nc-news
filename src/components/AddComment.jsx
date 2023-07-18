import { useState } from "react";
import "../../src/App.css";

const AddComment = ({
  onSubmit,
  handleSubmitError,
  isCommentPosted,
  setIsCommentPosted,
}) => {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCommentPosted && !isSubmitting) {
      setIsSubmitting(true);
      onSubmit(comment)
        .then(() => {
          setIsCommentPosted(true);
          setComment("");
        })
        .catch((err) => {
          setHandleSubmitError(true);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
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
      <button type="submit" disabled={isCommentPosted || isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      {handleSubmitError && <p>Unable to make a post at this time</p>}
    </form>
  );
};

export default AddComment;
