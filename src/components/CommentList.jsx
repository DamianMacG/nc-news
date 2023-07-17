import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "./utils/utils";
import CommentCard from "./CommentCard";

const CommentList = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getCommentsByArticleId(article_id)
      .then((data) => {
        setComments(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isError) {
    return <p>Failed to load comments</p>;
  } else if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="comment-list">
        <h2>Comments:</h2>
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
