import { searchPosts } from "../services/api";

export const AppPagination = ({
  apiResponsePages,
  isOrderedByRelevance,
  page,
  searchParams,
  setApiData,
  setIsLoading,
  setPage,
}: any) => {
  const handleNextPage = () => {
    const newPage = page >= apiResponsePages ? 1 : page + 1;
    updateResponseWithPagedRequest(newPage);
  };

  const handlePreviousPage = () => {
    const newPage = page <= 1 ? apiResponsePages : page - 1;
    updateResponseWithPagedRequest(newPage);
  };

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

  return (
    <div className="flex justify-center space-x-2 mt-3">
      <button onClick={handlePreviousPage}>{"<"}</button>
      <p>{page}</p>
      <button onClick={handleNextPage}>{">"}</button>
    </div>
  );
};
