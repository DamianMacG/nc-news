import { useEffect, useState } from "react";
import { getTopics } from "./utils/utils";
import { useNavigate, useLocation } from "react-router-dom";

const TopicSearch = ({ onChange }) => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getTopics()
      .then((topics) => {
        setTopics(topics);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const topicFromQuery = queryParams.get("topic");
    setSelectedTopic(topicFromQuery || "");
  }, [location]);

  const handleChange = (e) => {
    const selectedTopic = e.target.value;
    setSelectedTopic(selectedTopic);
    onChange(selectedTopic);
    navigate(selectedTopic ? `/articles?topic=${selectedTopic}` : "/articles");
  };

  if (isLoading) {
    return <p>Loading topics...</p>;
  }

  if (isError) {
    return <p>Error occurred while fetching topics.</p>;
  }

  return (
    <form className="search-box" onChange={handleChange}>
      <label htmlFor="topic">Choose a Topic:</label>
      <select
        id="topic"
        name="topic"
        value={selectedTopic}
        onChange={handleChange}
      >
        <option value="">All Topics</option>
        {topics.map((topic) => (
          <option key={topic.slug} value={topic.slug}>
            {topic.slug}
          </option>
        ))}
      </select>
    </form>
  );
};

export default TopicSearch;
