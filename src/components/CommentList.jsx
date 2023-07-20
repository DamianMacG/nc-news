import React, { useEffect, useState } from "react";
import { getCommentsByArticleId, deleteComment } from "./utils/utils";
import CommentCard from "./CommentCard";
import "../../src/App.css";

const CommentList = ({
  article_id,
  comments,
  setComments,
  isCommentPosted,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [isDeletingComment, setIsDeletingComment] = useState(false);

  const loggedInUserId = "grumpy19";

  const handleDeleteComment = (comment_id) => {
    setIsDeletingComment(true);
    deleteComment(comment_id)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== comment_id)
        );
        setIsDeletingComment(false);
      })
      .catch((err) => {
        setDeleteError(true);
        setIsDeletingComment(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(article_id)
      .then((data) => {
        setComments(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id, isCommentPosted, setComments]);

  if (isError) {
    return <p>Failed to load comments</p>;
  } else if (isLoading) {
    return <p>Loading...</p>;
  } else if (deleteError) {
    return <p>Cannot delete at this time</p>;
  }

  if (comments.length === 0) {
    return <p>No comments yet</p>;
  }

  return (
    <div className="comment-list">
      <h2>Comments:</h2>
      {isCommentPosted && <p>Comment posted successfully!</p>}
      {comments.map((comment) => (
        <CommentCard
          key={comment.comment_id}
          comment={comment}
          isCommentPosted={isCommentPosted}
          onDeleteComment={handleDeleteComment}
          loggedInUserId={loggedInUserId}
          isDeleting={isDeletingComment}
        />
      ))}
    </div>
  );
};

export default CommentList;
