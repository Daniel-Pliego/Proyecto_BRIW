"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import ResultCard from "./components/ResultCard";
import { SearchSuggestions } from "./components/SearchSuggestions";
import SideMenu from "./components/SideMenu";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState({});
  const [filter, setFilter] = useState({
    filterWord: "",
    type: "",
  });
  const [openAICorrection, setOpenAICorrection] = useState("");
  const [isLoading, setIsLoading] = useState({
    searchBar: false,
    correction: false,
  });

  useEffect(() => {
    if (searchQuery.length >= 3) {
      axios
        .get(`https://api.datamuse.com/sug?max=6&s=${searchQuery}`)
        .then((res) => {
          setSuggestions(res.data);
        });
    }
  }, [searchQuery]);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleSubmit = async (query) => {
    setIsLoading({ searchBar: true, correction: true });
    getSearch(query || searchQuery);
    setIsLoading({ searchBar: false, correction: true });
    let correction = await getOpenAICorrection(query || searchQuery);
    setOpenAICorrection(correction);
    setIsLoading({ searchBar: false, correction: false });
  };

  const getSearch = async (query) => {
    await axios
      .get(`/api/searcher/search?query=${query}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        setData({});
      })
      .finally(() => {
        setSearchQuery("");
      });
  };

  const getOpenAICorrection = async (query) => {
    try {
      if (query.length > 3) {
        let result = await axios.post("/api/openAI", { query });
        console.log(result.data);
        return result.data;
      }
      return "";
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  const handleFilter = (filterWord, type) => {
    if (filterWord === filter.filterWord) {
      setFilter({ filterWord: "", type: "" });
    } else setFilter({ filterWord, type });
  };

  return (
    <main className="flex min-h-screen bg-indigo-50">
      <SideMenu {...{ data, setFilter: handleFilter, filter }} />
      <div className="flex flex-col w-3/4 px-8 py-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col items-center justify-between w-full pb-8"
        >
          <div className="w-1/2 bg-white border-2 border-indigo-300 focus-within:shadow focus-within:shadow-indigo-400 rounded-3xl overflow-clip">
            <div className="flex items-center justify-between">
              {!isLoading.searchBar ? (
                <span className="material-symbols-outlined text-[20px] px-2">
                  search
                </span>
              ) : (
                <svg
                  class="animate-spin  mx-2 h-5 w-5 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              <input
                id="query"
                name="query"
                type="search"
                placeholder="Buscar..."
                className="w-full py-2 mr-3 focus:outline-none"
                value={searchQuery}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>
            {searchQuery.length > 0 && suggestions.length > 0 && (
              <SearchSuggestions
                {...{
                  suggestions,
                  onSelectSuggestion: (suggestion) => handleSubmit(suggestion),
                }}
              />
            )}
          </div>
          {isLoading.correction && (
            <span>
              <svg
                class="animate-spin  mx-4 h-4 w-3 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
          )}
          {openAICorrection != "" && (
            <span className="text-sm text-indigo-300">
              ¿Quizás quisiste decir?
              <span
                className="underline cursor-pointer"
                onClick={() => handleSubmit(openAICorrection)}
              >
                {openAICorrection}
              </span>
            </span>
          )}
        </form>
        <div className="flex justify-center w-full">
          <div className="flex flex-col w-full gap-2">
            {data.response?.docs.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full bg-white border-2 border-indigo-300 h-96 rounded-3xl">
                <span className="material-symbols-outlined text-[100px] text-indigo-300">
                  search
                </span>
                <p className="text-2xl text-indigo-300">
                  No se encontraron resultados
                </p>
              </div>
            ) : (
              data.response?.docs.map((doc, index) => {
                if (filter.filterWord.length > 0) {
                  if (filter.type === "category") {
                    if (doc.category.includes(filter.filterWord))
                      return <ResultCard key={index} {...{ data: doc }} />;
                  } else if (filter.type === "domain") {
                    if (new URL(doc.url).hostname === filter.filterWord)
                      return <ResultCard key={index} {...{ data: doc }} />;
                  }
                } else return <ResultCard key={index} {...{ data: doc }} />;
              })
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
