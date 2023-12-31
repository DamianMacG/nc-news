import React, { useEffect, useState } from "react";
import { getArticleById } from "../src/components/utils/utils";
import ArticlePageCard from "../src/components/ArticlePageCard";
import CommentList from "../src/components/CommentList";
import { patchArticle } from "../src/components/utils/utils";
import AddComment from "../src/components/AddComment";
import "../src/App.css";
import { useParams } from "react-router-dom";
import Error from "../src/components/ErrorPage";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentVoteCount, setCurrentVoteCount] = useState(0);
  const [voteError, setVoteError] = useState(false);
  const [comments, setComments] = useState([]);
  const [userVote, setUserVote] = useState(null);

  const updateCommentCount = (newComment) => {
    setArticle((prevArticle) => ({
      ...prevArticle,
      comment_count: prevArticle.comment_count + 1,
    }));
  };

  const updateCommentCountAfterDelete = () => {
    setArticle((prevArticle) => ({
      ...prevArticle,
      comment_count: prevArticle.comment_count - 1,
    }));
  };

  const handleVoteUp = () => {
    if (userVote === "up") {
      setUserVote(null);
      patchArticle(article_id, -1)
        .then((updatedArticle) => {
          setCurrentVoteCount((prevCount) => prevCount - 1);
        })
        .catch((err) => {
          setVoteError(true);
          setCurrentVoteCount((prevCount) => prevCount + 1);
        });
    } else if (userVote === "down") {
      setUserVote("up");
      patchArticle(article_id, 2)
        .then((updatedArticle) => {
          setCurrentVoteCount((prevCount) => prevCount + 2);
        })
        .catch((err) => {
          setVoteError(true);
        });
    } else {
      setUserVote("up");
      patchArticle(article_id, 1)
        .then((updatedArticle) => {
          setCurrentVoteCount((prevCount) => prevCount + 1);
        })
        .catch((err) => {
          setVoteError(true);
        });
    }
  };

  const handleVoteDown = () => {
    if (userVote === "down") {
      setUserVote(null);
      patchArticle(article_id, 1)
        .then((updatedArticle) => {
          setCurrentVoteCount((prevCount) => prevCount + 1);
        })
        .catch((err) => {
          setVoteError(true);
          setCurrentVoteCount((prevCount) => prevCount - 1);
        });
    } else if (userVote === "up") {
      setUserVote("down");
      patchArticle(article_id, -2)
        .then((updatedArticle) => {
          setCurrentVoteCount((prevCount) => prevCount - 2);
        })
        .catch((err) => {
          setVoteError(true);
        });
    } else {
      setUserVote("down");
      patchArticle(article_id, -1)
        .then((updatedArticle) => {
          setCurrentVoteCount((prevCount) => prevCount - 1);
        })
        .catch((err) => {
          setVoteError(true);
        });
    }
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
    return (
      <Error
        errorStatus={404}
        errorMessage={"Article not found: The requested article does not exist"}
      />
    );
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
        userVote={userVote}
      />
      <AddComment
        article_id={article_id}
        setComments={setComments}
        updateCommentCount={updateCommentCount}
      />
      <CommentList
        article_id={article.article_id}
        comments={comments}
        setComments={setComments}
        updateCommentCountAfterDelete={updateCommentCountAfterDelete}
      />
    </main>
  );
};

export default ArticlePage;
