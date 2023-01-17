import { useState } from "react";
import { searchPosts } from "../services/api";

export const Search = ({ setSearchParams, setApiData, setIsLoading }: any) => {
  const [query, setQuery] = useState<string>('');

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

      searchPosts(query).then((res) => {
        setApiData(res);
        setIsLoading(false);
      });
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="text-center justify-center m-20 p-8">
        <input placeholder="digite aqui..." onChange={handleChange} type="text" />
        <button onClick={handleSearch}>GET</button>
      </div>
    </>
  );
};
