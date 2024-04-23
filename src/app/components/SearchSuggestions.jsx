import React from "react";

export function SearchSuggestions ({ suggestions, onSelectSuggestion }){
  return (
    <ul className="flex flex-col py-2 list-none">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          className="flex items-center py-1 rounded hover:bg-gray-100"
          onClick={() => {
            onSelectSuggestion(suggestion.word);
          }}
        >
          <span className="material-symbols-outlined text-[20px] px-2">
            search
          </span>
          {suggestion.word}
        </li>
      ))}
    </ul>
  );
}
