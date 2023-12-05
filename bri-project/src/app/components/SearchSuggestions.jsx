"use client";
import React from "react";

export function SearchSuggestions() {
  return (
    <li className="flex flex-col py-2 list-none">
      {[...Array(5)].map((_, index) => (
        <ul
          key={index}
          className="flex items-center py-1 rounded hover:bg-gray-100"
          onClick={() => {}}
        >
          <span className="material-symbols-outlined text-[20px] px-2">
            search
          </span>
          Hola
        </ul>
      ))}
    </li>
  );
}
