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
      console.log(response.data.articles);
      return response.data.articles;
    });
};
