"use client";
import React, { useCallback, useState, useEffect  } from "react";
import SearchProfileTable  from "../components/SearchProfiles/SearchProfileTable";
import NewProfileForm from '../components/SearchProfiles/NewSearchPForm';
import HandlerManager from "../commands/HandlerManager";
import { UserData } from "../components/urls/Interface";

export default function SearchProfiles(){
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(new UserData({
        id_user: 1,
        username: '',
        password: ''
    }));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const manager = new HandlerManager();
                const response = await manager.getUrlsAndProfilesName(userData);
                if (response.status === 200) {
                    const responseData = await response.result;
                    setProfiles(responseData);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error al obtener o asignar los urls:", error);
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
