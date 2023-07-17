import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
// import { useContext } from "react";

function App() {

  
  
  
  return (
    <div className="app">
      <Navbar />
      <h1 className="heading">DG NEWS</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
