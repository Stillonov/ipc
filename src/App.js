import React from "react";
import "./styles.css";
import Instapost from "./components/Instapost";

export default function App() {
  return (
    <div className="app">
      <div className="app__header">
        <h1>Instagram. Post&nbsp;Comparing</h1>
      </div>
      <div className="app__posts">
        <Instapost />
        <Instapost />
        <Instapost />
      </div>
    </div>
  );
}
