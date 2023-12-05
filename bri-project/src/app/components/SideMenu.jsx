"use client";
import React, { useEffect, useState } from "react";

export default function SideMenu({ data, setFilter, filter }) {
  const [facets, setfacets] = useState({});
  const stopwords = ["are", "not", "-ive"];

  useEffect(() => {
    if (data != null && data.facet_counts != null) {
      const rawCategories = data.facet_counts.facet_fields.category;
      let categories = arrayToObject(rawCategories);
      for (const key in categories) {
        if (categories[key] === 0) {
          delete categories[key];
        }
      }
      stopwords.forEach((stopword) => {
        delete categories[stopword];
      });

      const rawDomains = data.response.docs.map(
        ({ url }) => new URL(url).hostname
      );
      const domains = countOccurrences(rawDomains);
      setfacets({ categories, domains });
    }
  }, [data]);

  const arrayToObject = (arr) => {
    const obj = {};

    for (let i = 0; i < arr.length; i += 2) {
      const key = arr[i];
      const value = arr[i + 1];
      obj[key] = value;
    }

    return obj;
  };

  function countOccurrences(arr) {
    const result = {};

    arr.forEach((str) => {
      result[str] = (result[str] || 0) + 1;
    });

    return result;
  }
  return (
    <div className="flex flex-col w-1/4 gap-4 p-8 overflow-y-auto text-sm bg-white border-r border-indigo-700 shadow">
      <div className="text-base">Filtrar por:</div>
      <div className="flex flex-col gap-2">
        <span className="text-base">Categoria</span>
        {facets.categories != null &&
          Object.keys(facets.categories).map((category) => (
            <div key={category}>
              <span
                className={`ml-4 ${
                  filter.filterWord == category &&
                  filter.type == "category" &&
                  "text-sky-600"
                }`}
                onClick={() => setFilter(category, "category")}
              >
                {category}
              </span>

              <span className="ml-2 text-xs text-gray-500">
                {facets.categories[category]}
              </span>
            </div>
          ))}
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-base">Dominio</span>
        {facets.domains != null &&
          Object.keys(facets.domains).map((domain) => (
            <div key={domain}>
              <span
                className={`ml-4 ${
                  filter.filterWord == domain &&
                  filter.type == "domain" &&
                  "text-sky-600"
                }`}
                onClick={() => setFilter(domain, "domain")}
              >
                {domain}
              </span>
              <span className="ml-2 text-xs text-gray-500">
                {facets.domains[domain]}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
