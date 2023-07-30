import "../../src/App.css";

const ArticlePageCard = ({
  article,
  handleVoteUp,
  handleVoteDown,
  currentVoteCount,
  voteError,
  userVote,
}) => {
  const formattedDate = new Date(article.created_at).toLocaleString();

  const handleVote = (voteType) => {
    const newVote = userVote === voteType ? null : voteType;
    const voteChange =
      newVote === "up" ? (userVote === "up" ? -1 : 1) : userVote === "down" ? 1 : -1;
    const newVoteCount = currentVoteCount + voteChange;
    if (voteType === "up") {
      handleVoteUp(newVote, newVoteCount);
    } else {
      handleVoteDown(newVote, newVoteCount);
    }
  };

  return (
    <>
      <section className="article-page-card">
        <h2>{article.title}</h2>
        <p>
          Posted in {article.topic}, by {article.author}
        </p>
        <p>on {formattedDate}</p>
        <img
          width="250px"
          src={article.article_img_url}
          alt={article.title}
        />
        <p>{article.body}</p>
        <p>Comment Count: {article.comment_count}</p>
        <p>Votes: {currentVoteCount}</p>
        <button
          className={`vote-button upvote ${userVote === "up" ? "voted" : ""}`}
          onClick={() => handleVote("up")}
          disabled={userVote === "down"}
        >
          Up Vote
        </button>

        <button
          className={`vote-button downvote ${userVote === "down" ? "voted" : ""}`}
          onClick={() => handleVote("down")}
          disabled={userVote === "up"}
        >
          Down Vote
        </button>
        {voteError && <p>Unable to vote at this moment</p>}
      </section>
    </>
  );
};

export default ArticlePageCard;
