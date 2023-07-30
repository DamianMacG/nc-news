import React, { useState } from "react";
import { postComment } from "./utils/utils";
import "../../src/App.css";
import ErrorPage from "./ErrorPage";

const AddComment = ({ article_id, setComments, updateCommentCount }) => {
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
          // Call the updateCommentCount function to increment the comment count
          updateCommentCount(newComment);
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
    <>
      {handleSubmitError && <ErrorPage errorStatus={500} errorMessage="Unable to post the comment. Please try again later." />}
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
      </form>
    </>
  );
};

export default AddComment;