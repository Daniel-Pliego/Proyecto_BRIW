"use client";
import React, { useCallback, useState, useEffect  } from "react";
import SearchProfileTable  from "../components/SearchProfiles/SearchProfileTable";
import NewProfileForm from '../components/SearchProfiles/NewSearchPForm';

export default function SearchProfiles(){
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    //const firstQuery = "SELECT * FROM briw.urls_consulta WHERE perfil_busqueda_id IN (SELECT id FROM briw.perfiles_busqueda WHERE usuario_id = 1) order by perfil_busqueda_id;";
    const firstQuery = "SELECT urls.*, perfiles.nombre AS nombre_perfil_busqueda " +
                        "FROM urls_consulta AS urls " +
                        "RIGHT JOIN perfiles_busqueda AS perfiles ON urls.perfil_busqueda_id = perfiles.id " +
                        "WHERE perfiles.usuario_id = 1 " +
                        "ORDER BY urls.perfil_busqueda_id;";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/server", {
                    method: "POST",
                    //body: "SELECT * FROM perfiles_busqueda where usuario_id = 1", //debe cambiar el usuario_id por el id del usuario logueado
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
