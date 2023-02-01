import { useState } from "react";

export const Search = ({
  setApiData,
  setApiResponsePages,
  setIsOrderedByRelevance,
  setPage,
  setSearchParams,
}: any) => {
  const [keyword, setKeyword] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    if (!keyword?.trim()) {
      window.location.reload()
      return;
    }

    setApiData(null);
    setSearchParams({ search: keyword });
    setIsOrderedByRelevance(false);
    setPage(1);
    setApiResponsePages(1);
  };

  return (
    <div className="flex flex-col gap-4 m-auto p-4 w-80">
      <input
        className="text-xl"
        type="text"
        placeholder="Spanish Keywords"
        autoFocus
        onChange={handleChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};
