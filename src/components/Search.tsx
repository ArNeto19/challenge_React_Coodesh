import { useState } from "react";
import { searchPosts } from "../services/api";

export const Search = ({
  setApiData,
  setApiResponsePages,
  setIsLoading,
  setIsOrderedByRelevance,
  setPage,
  setSearchParams,
}: any) => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    setSearchParams({ search: query });

    if (!query?.trim()) {
      setSearchParams(undefined);
      return;
    }

    try {
      setIsLoading(true);
      setApiData(null);
      setIsOrderedByRelevance(false);
      setPage(1);
      setApiResponsePages(1);

      searchPosts(query, 1).then((res) => {
        setApiData(res);
        setApiResponsePages(res.pages);
        setIsLoading(false);
      });
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-center justify-center m-10 p-8">
      <input placeholder="digite aqui..." onChange={handleChange} type="text" />
      <button onClick={handleSearch}>GET</button>
    </div>
  );
};
