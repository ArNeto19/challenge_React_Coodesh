import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArticleContent } from "../components/ArticleContent";
import { Breadcrumb } from "../components/Breadcrumb";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { NavBar } from "../components/NavBar";
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
      <NavBar showSearchIcon />
      {!articleData ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className='m-2 md:mx-10' >
            <Breadcrumb articleId={articleData.id} articleSlug={articleData.slug} />
          </div>
          <ArticleContent
            id={articleData.id}
            title={articleData.title}
            headline={articleData.headline}
            slug={articleData.slug}
            content={articleData.content}
            author={articleData.author}
            bibliography={articleData.bibliography}
            published={articleData.published}
            categories={articleData.categories}
            tags={articleData.tags}
          />
        </>
      )}
    </>
  );
};
