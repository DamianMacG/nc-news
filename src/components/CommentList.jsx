import React, { useEffect, useState } from "react";
import { getCommentsByArticleId } from "./utils/utils";
import CommentCard from "./CommentCard";
import "../../src/App.css";

const CommentList = ({ article_id, comments, setComments, isCommentPosted }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
  }

  if (comments.length === 0) {
    return <p>No comments yet</p>;
  }

  return (
    <div className="comment-list">
      <h2>Comments:</h2>
      {isCommentPosted && <p>Comment posted successfully!</p>}
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} isCommentPosted={isCommentPosted}/>
      ))}
    </div>
  );
};

export default CommentList;
