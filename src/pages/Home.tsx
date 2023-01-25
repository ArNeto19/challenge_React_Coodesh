import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppPagination } from "../components/AppPagination";
import { NavBar } from "../components/NavBar";
import { OrderByRelevance } from "../components/OrderByRelevance";
import { Search } from "../components/Search";
import { IApiData, IPostData } from "../services/api";

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [apiData, setApiData] = useState<IApiData | null>();
  const [posts, setPosts] = useState<IPostData[] | null>();
  const [isOrderedByRelevance, setIsOrderedByRelevance] = useState(false);
  const [page, setPage] = useState(1);
  const [apiResponsePages, setApiResponsePages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPosts(apiData?.data);
  }, [apiData, isLoading]);

  return (
    <>
      <NavBar />
      <div className="text-center m-10 text-5xl font-bold ">
        <h1>Search for health articles</h1>
      </div>
      <Search
        setApiData={setApiData}
        setApiResponsePages={setApiResponsePages}
        setIsLoading={setIsLoading}
        setIsOrderedByRelevance={setIsOrderedByRelevance}
        setPage={setPage}
        setSearchParams={setSearchParams}
      />

      <div className="my-5 mx-96 text-center p-8">
        {isLoading && <p>Loading...</p>}

        {apiData && <p>Foram encontrados: {apiData.size} artigos</p>}

        {posts && (
          <>
            <OrderByRelevance
              apiResponsePages={apiResponsePages}
              isOrderedByRelevance={isOrderedByRelevance}
              page={page}
              searchParams={searchParams}
              setApiData={setApiData}
              setIsLoading={setIsLoading}
              setIsOrderedByRelevance={setIsOrderedByRelevance}
              setPosts={setPosts}
              setPage={setPage}
            />
            <div className="text-start">
              {posts &&
                posts.map((post) => {
                  return (
                    <li key={post.id}>
                      <a href={`/article/${post.id}`}>{post.title}</a>
                    </li>
                  );
                })}
            </div>
            <AppPagination
              apiResponsePages={apiResponsePages}
              isOrderedByRelevance={isOrderedByRelevance}
              page={page}
              searchParams={searchParams}
              setApiData={setApiData}
              setIsLoading={setIsLoading}
              setPage={setPage}
            />
          </>
        )}
      </div>
    </>
  );
};
