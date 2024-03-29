import { useState, useEffect } from "react";
import ArticleListCard from "./ArticleListCard";
import { getArticles } from "./utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import TopicSearch from "./TopicSearch";
import Error from "./ErrorPage";
import SortBy from "./SortBy";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSort, setSelectedSort] = useState("created_at");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    const queryParams = new URLSearchParams(location.search);
    const sortFromQuery = queryParams.get("sort_by");
    setSelectedSort(sortFromQuery || "created_at");

    getArticles(sortFromQuery)
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [location]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const topicFromQuery = queryParams.get("topic");
    setSelectedTopic(topicFromQuery || "");
  }, [location]);

  const handleTopicChange = (selectedTopic) => {
    setSelectedTopic(selectedTopic);
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("topic", selectedTopic);
    navigate({ search: queryParams.toString() }); 
  };

  const handleSortChange = (selectedSort) => {
    setSelectedSort(selectedSort);
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("sort_by", selectedSort);
    navigate({ search: queryParams.toString() });
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
      return (
    <>
      <h2>Loading...</h2>
      <p>Apologies, this will just take uno momento.</p>
    </>
  );
  } else
    return (
      <main className="article-list">
        <h2>ARTICLE LIST</h2>
        <TopicSearch onChange={handleTopicChange} />
        <SortBy onSortChange={handleSortChange} />
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
