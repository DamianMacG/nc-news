import "../../src/App.css";

const ArticlePageCard = ({ article }) => {
  const formattedDate = new Date(article.created_at).toLocaleString();

  return (
    <>
    <h1>Article by ID</h1>
    <section className="article-page-card">
      <h2>{article.title}</h2>
      <p>Topic: {article.topic}</p>
      <p>Author: {article.author}</p>
      <p>Created At: {formattedDate}</p>
      <img width="250px" src={article.article_img_url} alt={article.title} />
      <p>{article.body}</p>
      <p>Comment Count: {article.comment_count}</p>
      <p>Votes: {article.votes}</p>
    </section>
    </>
  );
};

export default ArticlePageCard;
