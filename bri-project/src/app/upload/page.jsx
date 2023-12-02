"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function uploadPage() {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
    },
    onDrop
  });

  const saveFilesToLocalFolder = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Archivos subidos correctamente");
      } else {
        alert("Error subiendo archivos");
      }
    } catch (error) {
      alert("Error subiendo archivos", error);
    }
  };

  return (
    <div className="container p-8 mx-auto mt-8 border border-gray-300 rounded-lg">
      <div className="container p-8 mx-auto mt-8 border border-gray-300 rounded-lg">
        <h1 className="mb-4 text-2xl font-bold">Subida de archivos</h1>
        <div
          {...getRootProps()}
          className={`dropzone border-dashed border-2 p-4 ${
            isDragActive ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-center">
            Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar
          </p>
        </div>
        <div className="mt-4">
          <h2 className="mb-2 text-xl font-semibold">Archivos seleccionados</h2>
          <ul>
            {files.map((file, index) => (
              <li key={index} className="mb-2">
                {file.name} - {file.size} bytes
                <button
                  className="px-2 py-1 ml-2 text-white bg-red-500 rounded"
                  onClick={() => removeFile(index)}
                >
                  Eliminar archivo
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4">
        <button
          className="px-4 py-2 text-white bg-green-500 rounded"
          onClick={saveFilesToLocalFolder}
          disabled={files.length === 0}
        >
          Save Files to Local Folder
        </button>
      </div>
    </div>
  );
}
