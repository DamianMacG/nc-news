import React, { useState } from "react";
import { postComment } from "./utils/utils";
import "../../src/App.css";

const AddComment = ({ article_id, setComments }) => {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCommentPosted, setIsCommentPosted] = useState(false);
  const [handleSubmitError, setHandleSubmitError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCommentPosted && !isSubmitting) {
      setIsSubmitting(true);
      setHandleSubmitError(false);
      postComment(article_id, comment)
        .then((newComment) => {
          setIsCommentPosted(true);
          setComment("");
          setComments((prevComments) => [newComment, ...prevComments]);
        })
        .catch((err) => {
          setHandleSubmitError(true);
        })
        .finally(() => {
          setIsSubmitting(false);
          setIsCommentPosted(false);
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
