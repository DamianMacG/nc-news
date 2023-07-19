import { useEffect, useState } from "react";
import { getTopics } from "./utils/utils";

const TopicSearch = ({ onChange }) => {
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
  
    useEffect(() => {
      setIsLoading(true);
      setIsError(false);
  
      getTopics()
        .then((topics) => {
          setTopics(topics);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching topics:", error);
          setIsError(true);
          setIsLoading(false);
        });
    }, []);
  
    const handleChange = (e) => {
      const selectedTopic = e.target.value;
      setSelectedTopic(selectedTopic);
      onChange(selectedTopic);
    };
  
    if (isLoading) {
      return <p>Loading topics...</p>;
    }
  
    if (isError) {
      return <p>Error occurred while fetching topics.</p>;
    }
  
    return (
      <form className="search-box" onChange={handleChange}>
        <label htmlFor="category">Choose a Topic:</label>
        <select
          id="category"
          name="category"
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