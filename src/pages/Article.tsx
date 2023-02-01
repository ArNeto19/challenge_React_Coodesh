import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ArticleContent } from "../components/ArticleContent";
import { getArticle, IArticleData } from "../services/api";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { NavBar } from "../components/NavBar";

export const Article = () => {
  const { postId } = useParams();
  const [articleData, setArticleData] = useState<IArticleData | null>();

  useEffect(() => {
    try {
      getArticle(postId).then((res) => {
        setArticleData(res);
      });
    } catch (error) {
      console.log(error);
    }
  }, [postId]);

  return (
    <>
    <NavBar showSearchIcon />
      {!articleData ? (
        <LoadingSpinner />
      ) : (
        <ArticleContent
          title={articleData.title}
          headline={articleData.headline}
          content={articleData.content}
          author={articleData.author}
          bibliography={articleData.bibliography}
          published={articleData.published}
          categories={articleData.categories}
          tags={articleData.tags}
        />
      )}
    </>
  );
};
