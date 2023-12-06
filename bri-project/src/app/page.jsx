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

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery.length >= 3) {
      axios
        .get(`https://api.datamuse.com/sug?max=6&s=${searchQuery}`)
        .then((res) => {
          setSuggestions(res.data);
        });
    }
  }, [searchQuery]);

  const handleSubmit = () => {
    axios
      .get(`/api/searcher/search?query=${searchQuery}`)
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
            handleSubmit(e);
          }}
          className="flex flex-col items-center justify-between w-full pb-8"
        >
          <div className="w-1/2 bg-white border-2 border-indigo-300 focus-within:shadow focus-within:shadow-indigo-400 rounded-3xl overflow-clip">
            <div className="flex items-center justify-between">
              <span className="material-symbols-outlined text-[20px] px-2">
                search
              </span>
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
            {searchQuery.length > 0 && (
              <SearchSuggestions
                {...{
                  suggestions,
                  onSelectSuggestion: (suggestion) => {
                    setSearchQuery(suggestion);
                    handleSubmit();
                  },
                }}
              />
            )}
          </div>
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
              data.response?.docs.map((doc) => {
                if (filter.filterWord.length > 0) {
                  if (filter.type === "category") {
                    if (doc.category.includes(filter.filterWord))
                      return <ResultCard {...{ data: doc }} />;
                  } else if (filter.type === "domain") {
                    if (new URL(doc.url).hostname === filter.filterWord)
                      return <ResultCard {...{ data: doc }} />;
                  }
                } else return <ResultCard {...{ data: doc }} />;
              })
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
