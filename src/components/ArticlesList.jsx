import { useState, useEffect } from "react";
import ArticleListCard from "./ArticleListCard";
import { getArticles } from "./utils/utils";
import { useLocation } from "react-router-dom";
import TopicSearch from "./TopicSearch";
import Error from "./ErrorPage";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");

  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getArticles()
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const topicFromQuery = queryParams.get("topic");
    setSelectedTopic(topicFromQuery || "");
  }, [location]);

  const handleTopicChange = (selectedTopic) => {
    setSelectedTopic(selectedTopic);
  };

  const filteredArticles = selectedTopic
    ? articles.filter((article) => article.topic === selectedTopic)
    : articles;

  if (isError) {
    return (
      <Error
        errorStatus={404}
        errorMessage={"Articles not found: The requested articles do not exist"}
      />
    );
  } else if (isLoading) {
    return <p>Loading...</p>;
  } else
    return (
      <main className="article-list">
        <h2>ARTICLE LIST</h2>
        <TopicSearch onChange={handleTopicChange} />
        {filteredArticles.map((article) => (
          <ArticleListCard
            key={article.article_id}
            article={article}
          ></ArticleListCard>
        ))}
      </main>
    );
};

export default ArticleList;
