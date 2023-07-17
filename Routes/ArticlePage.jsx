import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById } from "../src/components/utils/utils";
import ArticlePageCard from "../src/components/ArticlePageCard";
import CommentList from "../src/components/CommentList";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id)
      .then((data) => {
        setArticle(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [article_id]);

  if (isError) {
    return <p>Failed to load Articles</p>;
  } else if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="article-page">
      <ArticlePageCard article={article} />
      <CommentList article_id={article.article_id}/>
    </main>
  );
};

export default ArticlePage;
