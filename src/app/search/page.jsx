"use client";
import React, { useCallback, useState, useEffect  } from "react";
import SearchProfileTable  from "../components/SearchProfileTable";

export default function SearchProfiles(){
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    //const firstQuery = "SELECT * FROM briw.urls_consulta WHERE perfil_busqueda_id IN (SELECT id FROM briw.perfiles_busqueda WHERE usuario_id = 1) order by perfil_busqueda_id;";
    const firstQuery = "SELECT urls.*, perfiles.nombre AS nombre_perfil_busqueda " +
                        "FROM urls_consulta AS urls " +
                        "JOIN perfiles_busqueda AS perfiles ON perfil_busqueda_id = perfiles.id " +
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
                    setProfiles(data.usuarios);
                    setLoading(false); // Cuando los perfiles se cargan, setLoading se establece en false
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
    }

    return (
        <div className="container p-8 mx-auto mt-8 border border-gray-300 rounded-lg">
            <h1 className="mb-4 text-2xl font-bold">PERFILES DE BUSQUEDA</h1>
            <SearchProfileTable profiles={ profiles } />
            {/* <ul> */}
            {
                //profiles.map(profile => (
                    // <li key={profile.id}>
                    //     <p>Perfil de busqueda: {profile.perfil_busqueda_id}</p>
                    //     <p>Nombre: {profile.nombre}</p>
                    //     <p>url: {profile.url}</p>
                    //     <p>Frecuencia de consulta: {profile.frecuencia_consulta_hrs || "0 hrs"}</p>
                    //     {/* <p>Fecha de creación: {new Date(profile.fecha_creacion).toLocaleString()}</p> */}
                    // </li>
                //))
            }
            {/* </ul> */}
            {/* <SearchProfileTable /> */}
        </div>
    );
};








// "use client";
// import React, { useCallback, useState, useEffect } from "react";

// export default async function SearchProfiles(){
//     const [profiles, setProfiles] = useState([]);

//     // useEffect(() => {
//     //     // Realizar la solicitud para obtener el JSON
//     //     fetch("url_del_json")
//     //         .then(response => response.json())
//     //         .then(data => {
//     //             // Actualizar el estado con los datos recibidos
//     //             setProfiles(data);
//     //         })
//     //         .catch(error => {
//     //             console.error("Error al obtener los datos:", error);
//     //         });
//     // }, []);

//     try {
//         const response = await fetch("/server", {
//           method: "GET",
//         });
//         if (response.ok) {
//             alert("Se obtuvieron los perfiles de búsqueda correctamente");
//             console.log("Se obtuvieron los perfiles de búsqueda correctamente");
//         } else {
//             alert("Error obteniendo perfiles de búsqueda");
//             throw new Error("Error obteniendo perfiles de búsqueda");
//         }
//       } catch (error) {
//         alert("Error!!!!!!!!!!!!!!!!!", error);
//       }

//     return (
//         <div className="container p-8 mx-auto mt-8 border border-gray-300 rounded-lg">
//         <h1 className="mb-4 text-2xl font-bold">PERFILES DE BUSQUEDA</h1>
//         </div>
//         );
// };

