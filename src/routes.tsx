import { Route, Routes } from "react-router-dom";
import { Article } from "./pages/Article";
import { Home } from "./pages/Home";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article/:postId" element={<Article />} />
    </Routes>
  );
};
