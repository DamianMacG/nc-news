import axios from "axios";

const api = axios.create({
  baseURL: "https://reddit-style-backend-nc.onrender.com/api",
});

export const getArticles = (limit = 40, page = 1) => {
  return api
    .get("/articles", {
      params: {
        limit,
        p: page,
      },
    })
    .then((response) => {
      return response.data.articles;
    });
};

export const getArticleById = (article_id) => {
  return api.get(`/articles/${article_id}`).then((response) => {
    return response.data.article;
  });
};

export const getCommentsByArticleId = (article_id, limit = 20) => {
  return api
    .get(`/articles/${article_id}/comments`, {
      params: {
        limit,
      },
    })
    .then((response) => {
      return response.data.comments;
    });
};

export const patchArticle = (articleId, votes) => {
  return api
    .patch(`/articles/${articleId}`, { inc_votes: votes })
    .then((response) => {
      return response.data.article;
    });
};

export const postComment = (article_id, comment) => {
  const requestData = {
    username: "grumpy19",
    body: comment,
  };

  return api
    .post(`/articles/${article_id}/comments`, requestData)
    .then((response) => {
      return response.data.comment;
    })
    .catch((error) => {
      console.error("Failed to post comment:", error.response);
      throw error;
    });
};

export const getTopics = () => {
  return api.get(`/topics`).then((response) => {
    return response.data.topics;
  });
};
