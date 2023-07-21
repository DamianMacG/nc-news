import "../../src/App.css";

const ArticlePageCard = ({
  article,
  handleVoteUp,
  handleVoteDown,
  currentVoteCount,
  voteError,
}) => {
  const formattedDate = new Date(article.created_at).toLocaleString();

  return (
    <>
      <section className="article-page-card">
        <h2>{article.title}</h2>
        <p>Posted in {article.topic}, by {article.author}</p>
        <p>on {formattedDate}</p>
        <img width="250px" src={article.article_img_url} alt={article.title} />
        <p>{article.body}</p>
        <p>Comment Count: {article.comment_count}</p>
        <p>Votes: {currentVoteCount}</p>
        <button className="vote-button upvote" onClick={handleVoteUp}>Up Vote</button>
        <button className="vote-button downvote" onClick={handleVoteDown}>Down Vote</button>
        {voteError && <p>Unable to vote at this moment</p>}
      </section>
    </>
  );
};

export default ArticlePageCard;
