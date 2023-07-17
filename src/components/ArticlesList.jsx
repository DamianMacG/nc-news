import ArticleListCard from "./ArticleListCard";
import { getArticles } from "./utils/utils";
import { useState, useEffect } from "react";

const ArticleList = () => {
  const [articles, setArticles] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [votingError, setVotingError] = useState(false);


  useEffect(() => {
    getArticles()
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, []);

 
  const handleVote = (article_id) => {
    patchArticle(article_id)
      .then((updatedArticle) => {
        const updatedArticles = articles.map((article) => {
          if (article.article_id === updatedArticle.article_id) {
            return { ...article, vote_count: updatedArticle.vote_count };
          }
          return article;
        });
        setArticles(updatedArticles);
        setVotingError(false); 
      })
      .catch((err) => {
        setVotingError(true);
      });
  };



  if (isError) {
    return <p>Failed to load Articles</p>;
  } else if (isLoading) {
    return <p>Loading...</p>;
  } else
    return (
      <main className="article-list">
        <h2>ARTICLE LIST</h2>
        {articles.map((article) => (
          <ArticleListCard key={article.article_id} article={article} handleVote={handleVote}></ArticleListCard>
        ))}
      </main>
    );
};

export default ArticleList;
