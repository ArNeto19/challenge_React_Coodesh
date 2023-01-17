import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "../components/Search";
import { searchPosts, IApiData, IPostData } from "../services/api";

export const Home = () => {
  const [apiData, setApiData] = useState<IApiData | null>();
  const [posts, setPosts] = useState<IPostData[] | null>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    setPosts(apiData?.data);
  }, [apiData, isLoading]);

  const orderByRelevance = () => {
    try {
      setIsLoading(true);

      searchPosts(`${searchParams.get("search")}&page=1&orderby=relevance`).then((res) => {
        setApiData(res);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Search
        setApiData={setApiData}
        setSearchParams={setSearchParams}
        setIsLoading={setIsLoading}
      />

      <div className="my-5 mx-96 text-center p-8">
        {isLoading && <p>Loading...</p>}

        {apiData && <p>Foram encontrados: {apiData.size} artigos</p>}

        {posts && <button onClick={orderByRelevance}>Ordenar por relevância</button>}
        <div className="text-start">
          {posts &&
            posts.map((post) => {
              return <li key={post.id}>{post.title}</li>;
            })}
        </div>
      </div>
    </>
  );
};
