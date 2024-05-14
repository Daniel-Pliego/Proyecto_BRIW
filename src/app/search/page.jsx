"use client";
import React, { useCallback, useState, useEffect  } from "react";
import SearchProfileTable  from "../components/SearchProfiles/SearchProfileTable";
import NewProfileForm from '../components/SearchProfiles/NewSearchPForm';

export default function SearchProfiles(){
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    const firstQuery = "SELECT urls.*, profiles.name AS profile_name " +
                        "FROM urls " +
                        "RIGHT JOIN users_profiles AS profiles ON urls.id_profile = profiles.id " +
                        "WHERE profiles.id_user = 1 " +
                        "ORDER BY urls.id_profile;";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/server", {
                    method: "POST",
                    body: firstQuery,
                });
                if (response.ok) {
                    const data = await response.json();
                    setProfiles(data.result);
                    setLoading(false);
                }
            } catch (error) {
                alert("Error al obtener perfiles de búsqueda: " + error);
                console.error("Error al obtener perfiles de búsqueda:", error);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Cargando perfiles...</div>; 
        // Se puede poner otro elemento mas bonito
    }

    return (
        <div className="container p-8 mx-auto mt-8 border border-gray-300 rounded-lg">
            <h1 className="mb-4 text-2xl font-bold">PERFILES DE BUSQUEDA</h1>
            <SearchProfileTable profiles={ profiles } />
            {/* <Button variant="contained">Agrear Perfil de busqueda</Button>  */}
            <NewProfileForm />
        </div>
    );
};
