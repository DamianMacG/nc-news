import "../../src/App.css";

const CommentCard = ({ comment }) => {
  const formattedDate = new Date(comment.created_at).toLocaleString();

  return (
    <>
      <section key={comment.comment_id} className="comment-card">
        <p>{comment.body}</p>
        <p>
          Posted by {comment.author} on {formattedDate}
        </p>
      </section>
    </>
  );
};

export default CommentCard;
