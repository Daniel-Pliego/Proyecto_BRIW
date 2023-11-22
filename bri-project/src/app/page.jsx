import ResultCard from "./components/ResultCard";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-8 bg-slate-50">
      <div className="flex flex-col items-center justify-between w-full pb-8">
        <input
          type="search"
          placeholder="Buscar..."
          className="w-1/2 p-2 px-4 border border-indigo-600 rounded-full ring-1 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex justify-center w-full">
        <div className="w-1/2 ">
          <ResultCard />
        </div>
      </div>
    </main>
  );
}
