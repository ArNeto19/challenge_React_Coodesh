import { searchPosts } from "../services/api";

export const OrderByRelevance = ({
  isOrderedByRelevance,
  page,
  searchParams,
  setApiData,
  setIsLoading,
  setIsOrderedByRelevance,
  setPosts,
}: any) => {
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
    <div className="flex justify-center space-x-2 my-3" onClick={orderByRelevance}>
      <button>Ordenar por relevância</button>
      <input type="checkbox" checked={isOrderedByRelevance} />
    </div>
  );
};
