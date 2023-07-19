import ArticleListCard from "./ArticleListCard";
import { getArticles } from "./utils/utils";
import { useState, useEffect } from "react";
import TopicSearch from "./TopicSearch";

const ArticleList = () => {
  const [articles, setArticles] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  
  
  const handleTopicChange = (selectedTopic) => {
    setSelectedTopic(selectedTopic);
  };

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

  const filteredArticles = selectedTopic
  ? articles.filter((article) => article.topic === selectedTopic)
  : articles;

  if (isError) {
    return <p>Failed to load Articles</p>;
  } else if (isLoading) {
    return <p>Loading...</p>;
  } else
    return (
      <main className="article-list">
        <h2>ARTICLE LIST</h2>
        <TopicSearch onChange={handleTopicChange} />
        {filteredArticles.map((article) => (
          <ArticleListCard key={article.article_id} article={article}></ArticleListCard>
        ))}
      </main>
    );
};

export default ArticleList;
