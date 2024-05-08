import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex items-center w-full gap-4 px-8 py-2 text-white bg-indigo-600">
      <Link className="flex hover:text-gray-200" href="/">
        <span className="material-symbols-outlined">search</span>
      </Link>
      <Link className="p-2 px-4 rounded-lg hover:bg-indigo-700" href="/">
        Buscador
      </Link>
      <Link className="p-2 px-4 rounded-lg hover:bg-indigo-700" href="/upload">
        Subir archivos
      </Link>
      <Link className="p-2 px-4 rounded-lg hover:bg-indigo-700" href="/search">
        Perfiles de busqueda
      </Link>
    </nav>
  );
};
