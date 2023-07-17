import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById } from "../src/components/utils/utils";
import ArticlePageCard from "../src/components/ArticlePageCard";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState("");

  useEffect(() => {
    getArticleById(article_id)
      .then((data) => {
        setArticle(data);
      })
      .catch((error) => {
        console.log("Error fetching article:", error);
      });
  }, [article_id]);

  if (!article) {
    return <p>Loading article...</p>;
  }

  return (
    <main className="article-page">
      <ArticlePageCard article={article} />
    </main>
  );
};

export default ArticlePage;
