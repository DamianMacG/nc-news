import { useLocation, useNavigate } from "react-router-dom";

const SortBy = ({ onSortChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const topicParam = searchParams.get("topic");
  const sortParam = searchParams.get("sort_by");

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    onSortChange(selectedSort);

    if (topicParam) {
      navigate(`/articles?topic=${topicParam}&sort_by=${selectedSort}`);
    } else {
      navigate(`/articles?sort_by=${selectedSort}`);
    }
  };

  return (
    <div className="sort-by">
      <label htmlFor="sort">Sort by:</label>
      <select
        id="sort"
        name="sort"
        onChange={handleSortChange}
        value={sortParam || ""}
      >
        <option value="created_at">Newest</option>
        <option value="comment_count">Most comments</option>
        <option value="votes">Highest voted</option>
      </select>
    </div>
  );
};

export default SortBy;
