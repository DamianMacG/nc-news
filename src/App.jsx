import { Routes, Route } from "react-router-dom";
import Home from "../Routes/Home";
import ArticlePage from "../Routes/ArticlePage";
import Navbar from "./components/Navbar";
import Error from "./components/ErrorPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/articles" element={<Home />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
        <Route
          path="*"
          element={
            <Error
              errorStatus={404}
              errorMessage={"Not Found: Page does not exist"}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
