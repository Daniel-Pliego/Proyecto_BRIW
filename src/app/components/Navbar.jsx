"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export const Navbar = () => {
  const { data: session } = useSession();
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
      {session ? (
        <button onClick={() => signOut()}>Cerrar sesión</button>
      ) : (
        <div>
          <Link
            className="p-2 px-4 rounded-lg hover:bg-indigo-700"
            href="/auth/login"
          >
            Ingresar
          </Link>
          <Link
            className="p-2 px-4 rounded-lg hover:bg-indigo-700"
            href="/auth/register"
          >
            Registrarse
          </Link>
        </div>
      )}
    </nav>
  );
};
