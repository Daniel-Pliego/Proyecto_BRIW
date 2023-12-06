import React from "react";

export default function ResultCard({ data }) {
  return (
    <div className="flex flex-col w-full p-4 text-sm bg-wte">
      <h2 className="text-lg">{data.title}</h2>
      <span className="font-medium text-green-500">{data.url}</span>
      <span className="text-gray-500">
        {data.metaDescription[0].slice(0, 100)}
      </span>
      <div className="flex gap-2 text-xs text-sky-600">
        {data.category.map((cat) => (
          <span key={cat}>{cat}</span>
        ))}
      </div>
      <span className="text-xs text-gray-500">
        score: <span className="text-amber-500">{data.score}</span>
      </span>
    </div>
  );
}
