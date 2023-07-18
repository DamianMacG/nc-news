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
        <p>Topic: {article.topic}</p>
        <p>Author: {article.author}</p>
        <p>Created At: {formattedDate}</p>
        <img width="250px" src={article.article_img_url} alt={article.title} />
        <p>{article.body}</p>
        <p>Comment Count: {article.comment_count}</p>
        <p>Votes: {currentVoteCount}</p>
        <button onClick={handleVoteUp}>Up Vote</button>
        <button onClick={handleVoteDown}>Down Vote</button>
        {voteError && <p>Unable to vote at this moment</p>}
      </section>
    </>
  );
};

export default ArticlePageCard;
