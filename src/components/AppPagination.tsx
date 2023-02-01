export const AppPagination = ({
  apiResponsePages,
  page,
  searchParams,
  setApiData,
  setPage,
  setSearchParams,
}: any) => {
  const handleNextPage = () => {
    const newPage = page >= apiResponsePages ? 1 : page + 1;
    updateRequestPage(newPage);
  };

  const handlePreviousPage = () => {
    const newPage = page <= 1 ? apiResponsePages : page - 1;
    updateRequestPage(newPage);
  };

  const updateRequestPage = (newPageNumber: number) => {
    setApiData(null);
    setPage(newPageNumber);
    setSearchParams({ search: searchParams.get("search"), page: newPageNumber });
  };

  return (
    <div className="flex justify-center space-x-2 mt-3">
      <button onClick={handlePreviousPage}>{"<"}</button>
      <p>{page}</p>
      <button onClick={handleNextPage}>{">"}</button>
    </div>
  );
};
