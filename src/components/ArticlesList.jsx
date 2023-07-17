import ArticleListCard from "./ArticleListCard";
import { getArticles } from "./utils/utils";
import { useState, useEffect } from "react";

const ArticleList = () => {
  const [articles, setArticles] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
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

  if (isError) {
    return <p>Error!!!</p>;
  } else if (isLoading) {
    return <p>Loading...</p>;
  } else
    return (
      <div className="item-list">
        <h2>ARTICLE LIST</h2>
        {articles.map((article) => (
          <ArticleListCard key={article.article_id} article={article}></ArticleListCard>
        ))}
      </div>
    );
};

export default ArticleList;
