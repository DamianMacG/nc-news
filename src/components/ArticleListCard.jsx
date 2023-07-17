import { Link } from "react-router-dom";

const ArticleListCard = ({ article }) => {
  const formattedDate = new Date(article.created_at).toLocaleString();
  
    return (
      <Link to={`/articles/${article.article_id}`}>
      <section className="article-list-card">
        <h2>{article.title}</h2>
        <p> Posted by {article.author} in {article.topic} on {formattedDate}</p>
        <img width="200px" src={article.article_img_url} alt={article.title} />
        <p>Comments: {article.comment_count} Votes: {article.votes}</p>
      </section>
      </Link>
    );
  };
  
  export default ArticleListCard;