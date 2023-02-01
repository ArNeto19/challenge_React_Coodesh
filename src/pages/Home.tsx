import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppPagination } from "../components/AppPagination";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { NavBar } from "../components/NavBar";
import { OrderByRelevance } from "../components/OrderByRelevance";
import { Search } from "../components/Search";
import { IApiData, IPostData, searchPosts } from "../services/api";

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [apiData, setApiData] = useState<IApiData | null>();
  const [posts, setPosts] = useState<IPostData[] | null>();
  const [query, setQuery] = useState<string>();
  const [page, setPage] = useState(1);
  const [isOrderedByRelevance, setIsOrderedByRelevance] = useState(true);
  const [apiResponsePages, setApiResponsePages] = useState<number | undefined>(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (apiData) {
      setPosts(apiData?.data);
      setApiResponsePages(apiData?.pages);
      return;
    }

    if (query) {
      try {
        setIsLoading(true);

        searchPosts(query, page, isOrderedByRelevance ? "relevance" : undefined).then((res) => {
          setApiData(res);
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
        return;
      }

      return;
    }

    setSearchParams(undefined);
  }, [apiData, query, page, isOrderedByRelevance, setSearchParams]);

  return (
    <>
      <NavBar />
      <div className="flex flex-col text-center p-6 my-10">
        <h1>FIND INTERESTING CONTENT</h1>

        <Search
          setApiData={setApiData}
          setApiResponsePages={setApiResponsePages}
          setIsOrderedByRelevance={setIsOrderedByRelevance}
          setPage={setPage}
          setSearchParams={setSearchParams}
          setQuery={setQuery}
        />

        {apiData && <p>Foram encontrados: {apiData.size} artigos</p>}

        {posts && (
          <OrderByRelevance
            isOrderedByRelevance={isOrderedByRelevance}
            setIsOrderedByRelevance={setIsOrderedByRelevance}
            setApiData={setApiData}
          />
        )}

        {isLoading && <LoadingSpinner />}

        {posts && (
          <>
            <div className="text-start m-auto md:w-1/3">
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
              page={page}
              searchParams={searchParams}
              setApiData={setApiData}
              setPage={setPage}
              setSearchParams={setSearchParams}
            />
          </>
        )}
      </div>
    </>
  );
};
