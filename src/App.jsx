import { Routes, Route } from "react-router-dom";
import Home from "../Routes/Home";
import ArticlePage from "../Routes/ArticlePage";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/articles" element={<Home />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
    </div>
  );
}

export default App;