import "../../src/App.css";

const CommentCard = ({ comment, onDeleteComment, isCommentPosted, loggedInUserId, isDeleting }) => {
  const formattedDate = new Date(comment.created_at).toLocaleString();

  const handleDelete = () => {
    onDeleteComment(comment.comment_id);
  };

  return (
    <section key={comment.comment_id} className="comment-card">
      <p>{comment.body}</p>
      <p>
        Posted by {comment.author} on {formattedDate}
      </p>
      {comment.author === loggedInUserId && (
        <button onClick={handleDelete} disabled={isCommentPosted || isDeleting}>
          Delete
        </button>
      )}
    </section>
  );
};

export default CommentCard;
