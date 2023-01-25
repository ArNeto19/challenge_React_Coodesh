import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { NavBar } from "../components/NavBar";
import { ArticleContent } from "../components/ArticleContent";
import { getArticle, IArticleData } from "../services/api";

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
      <NavBar />
      {!articleData ? (
        <div className="p-40">
          <p>Loading content...</p>
        </div>
      ) : (
        <div className="flex">
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
          <div>
            <h1>
              {articleData.author.name}
            </h1>
          </div>
        </div>
      )}
    </>
  );
};
