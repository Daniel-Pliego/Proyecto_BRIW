"use client";
import React, { useCallback, useState } from "react";
import DocumentsTable from "../components/Documents/DocumentsTable";
import Link from "next/link";
import DropdownMenu from "../components/DropMenu";

export default function UploadPage () {
  return (
    <div className="justify-center items-center">
      <div className="flex justify-center items-center">
        <h1 className="p-6 text-indigo-600 font-bold text-4xl mb-4 my-8">
          Mis Documentos
        </h1>
        <span className="w-60"></span>
        <div className="mx-100">
          <DropdownMenu />
        </div>
      </div>

      <DocumentsTable />
      <div className="container px-8 pt-2 mx-auto mt-8">
        <Link
          className="px-4 py-3 text-white bg-indigo-500 rounded"
          href="/upload"
        >
          Subir documentos
        </Link>
      </div>
    </div>
  );
}
{
  /* <Link className="p-2 px-4 rounded-lg hover:bg-indigo-700" href="/upload">
        Subir documentos
      </Link> */
}
