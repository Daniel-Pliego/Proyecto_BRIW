import ResultCard from "./components/ResultCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-8 bg-slate-50">
      <div className="w-full flex flex-col items-center justify-between pb-8">
        <input
          type="search"
          placeholder="Buscar..."
          className="border ring-1 w-1/2 border-indigo-600 p-2 px-4 rounded-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="w-full flex justify-center">
        <div className="w-1/2 ">
          <ResultCard />
        </div>
      </div>
    </main>
  );
}
