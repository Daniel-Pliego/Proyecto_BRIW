import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="w-full bg-indigo-600 text-white flex px-8 py-2 gap-4 items-center">
      <Link className="flex hover:text-gray-200" href="/">
        <span className="material-symbols-outlined">search</span>
      </Link>

      <div className="p-2 px-4 hover:bg-indigo-700 rounded-lg">
        <Link href="/">Buscador</Link>
      </div>
      <div className="p-2 px-4 hover:bg-indigo-700 rounded-lg">
        <Link href="/upload">Subir archivos</Link>
      </div>
    </nav>
  );
};
