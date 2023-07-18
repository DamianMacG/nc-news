import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById } from "../src/components/utils/utils";
import ArticlePageCard from "../src/components/ArticlePageCard";
import CommentList from "../src/components/CommentList";
import { patchArticle } from "../src/components/utils/utils";
import AddComment from "../src/components/AddComment";
import { postComment } from "../src/components/utils/utils";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentVoteCount, setCurrentVoteCount] = useState(0);
  const [voteError, setVoteError] = useState(false);
  const [comments, setComments] = useState([]);
   const [isCommentPosted, setIsCommentPosted] = useState(false)

  const handleVoteUp = () => {
    setCurrentVoteCount((prevCount) => prevCount + 1);
    setVoteError(false);
    patchArticle(article_id, 1)
      .then((updatedArticle) => {
        setCurrentVoteCount(updatedArticle.votes);
      })
      .catch((err) => {
        setVoteError(true);
        setCurrentVoteCount((prevCount) => prevCount - 1);
      });
  };

  const handleVoteDown = () => {
    setCurrentVoteCount((prevCount) => prevCount - 1);
    setVoteError(false);
    patchArticle(article_id, -1)
      .then((updatedArticle) => {
        setCurrentVoteCount(updatedArticle.votes);
      })
      .catch((err) => {
        setVoteError(true);
        setCurrentVoteCount((prevCount) => prevCount + 1);
      });
  };

  const handleSubmitComment = (comment) => {
    postComment(article_id, comment)
      .then((newComment) => {
        setIsCommentPosted(true)
        // setComments((prevComments) => [...prevComments, newComment]);
      })
      .catch((err) => {
        console.log("HANDLE SUBMIT ERROR")
      });
  };

  useEffect(() => {
    getArticleById(article_id)
      .then((data) => {
        setArticle(data);
        setCurrentVoteCount(data.votes);
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
      <ArticlePageCard
        article={article}
        handleVoteUp={handleVoteUp}
        handleVoteDown={handleVoteDown}
        currentVoteCount={currentVoteCount}
        voteError={voteError}
      />
      <AddComment onSubmit={handleSubmitComment} />
      <CommentList article_id={article.article_id} comments={comments} setComments={setComments} isCommentPosted={isCommentPosted} />
    </main>
  );
};

export default ArticlePage;
