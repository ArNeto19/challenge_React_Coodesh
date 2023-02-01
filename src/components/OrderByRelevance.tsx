export const OrderByRelevance = ({
  page,
  isOrderedByRelevance,
  searchParams,
  setIsOrderedByRelevance,
  setApiData,
  setSearchParams,
}: any) => {
  const toggleOrderByRelevance = () => {
    setApiData(null);
    setIsOrderedByRelevance(!isOrderedByRelevance);

    !isOrderedByRelevance
      ? setSearchParams({
          search: searchParams.get("search"),
          page,
          orderby: "relevance",
        })
      : setSearchParams({ search: searchParams.get("search"), page });
  };

  return (
    <div className="flex flex-row justify-center space-x-2 my-3 mx-auto w-48" onClick={toggleOrderByRelevance}>
      <button>Ordenar por relevância</button>
      <input type="checkbox" checked={isOrderedByRelevance} readOnly />
    </div>
  );
};
