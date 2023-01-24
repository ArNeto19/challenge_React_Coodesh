import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Search } from "../components/Search";
import { searchPosts, IApiData, IPostData } from "../services/api";

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

  const updateResponseWithPagedRequest = (newPageNumber: number) => {
    setPage(newPageNumber);

    try {
      setIsLoading(true);

      if (isOrderedByRelevance) {
        searchPosts(`${searchParams.get("search")}`, newPageNumber, "relevance").then((res) => {
          setApiData(res);
          setIsLoading(false);
        });
        return;
      }

      searchPosts(`${searchParams.get("search")}`, newPageNumber).then((res) => {
        setApiData(res);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPage = () => {
    const newPage = page >= apiResponsePages ? 1 : page + 1;
    updateResponseWithPagedRequest(newPage);
  };

  const handlePreviousPage = () => {
    const newPage = page <= 1 ? apiResponsePages : page - 1;
    updateResponseWithPagedRequest(newPage);
  };

  const orderByRelevance = () => {
    if (!isOrderedByRelevance) {
      try {
        setIsLoading(true);
        setPosts(null);
        setIsOrderedByRelevance(true);

        searchPosts(`${searchParams.get("search")}`, page, "relevance").then((res) => {
          setApiData(res);
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
      return;
    }

    try {
      setIsLoading(true);
      setPosts(null);
      setIsOrderedByRelevance(false);

      searchPosts(`${searchParams.get("search")}`, page).then((res) => {
        setApiData(res);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          <div>
            <div className="flex justify-center space-x-2 my-3" onClick={orderByRelevance}>
              <button>Ordenar por relevância</button>
              <input type="checkbox" checked={isOrderedByRelevance} />
            </div>
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
            <div className="flex justify-center space-x-2 mt-3">
              <button onClick={handlePreviousPage}>{"<"}</button>
              <p>{page}</p>
              <button onClick={handleNextPage}>{">"}</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
