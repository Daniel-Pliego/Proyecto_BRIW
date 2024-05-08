"use client";
import React, { useCallback, useState, useEffect } from "react";

export default function SearchProfiles(){
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        // Realizar la solicitud para obtener el JSON
        fetch("url_del_json")
            .then(response => response.json())
            .then(data => {
                // Actualizar el estado con los datos recibidos
                setProfiles(data);
            })
            .catch(error => {
                console.error("Error al obtener los datos:", error);
            });
    }, []);

    return (
        <div className="container p-8 mx-auto mt-8 border border-gray-300 rounded-lg">
        <h1 className="mb-4 text-2xl font-bold">PERFILES DE BUSQUEDA</h1>
        </div>
        );
};