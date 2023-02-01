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
  const [page, setPage] = useState(1);
  const [isOrderedByRelevance, setIsOrderedByRelevance] = useState(false);
  const [apiResponsePages, setApiResponsePages] = useState<number | undefined>(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (apiData) {
      setPosts(apiData.data);
      setApiResponsePages(apiData.pages);
      return;
    }

    if (searchParams.toString() !== "") {
      try {
        setIsLoading(true);
        let paramsQuery = searchParams.get("search");
        let paramsPage = searchParams.get("page");
        let paramsOrderType = searchParams.get("orderby");

        if (paramsPage !== null) {
          setPage(+paramsPage);
        }

        if (paramsOrderType !== null) {
          setIsOrderedByRelevance(true);
        }

        searchPosts(
          paramsQuery,
          paramsPage ? +paramsPage : page,
          paramsOrderType ? paramsOrderType : undefined
        ).then((res) => {
          setApiData(res);
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [apiData, searchParams, page, isOrderedByRelevance]);

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
        />

        {apiData && <p>Foram encontrados: {apiData.size} artigos</p>}

        {posts && (
          <OrderByRelevance
            page={page}
            isOrderedByRelevance={isOrderedByRelevance}
            searchParams={searchParams}
            setIsOrderedByRelevance={setIsOrderedByRelevance}
            setApiData={setApiData}
            setSearchParams={setSearchParams}
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
