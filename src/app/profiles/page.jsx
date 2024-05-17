"use client";
import React, { useCallback, useState, useEffect  } from "react";
import SearchProfileTable  from "../components/SearchProfiles/ProfilesTable";
import NewProfile from '../components/SearchProfiles/NewProfile';
import HandlerManager from "../../infra/store/commands/HandlerManager";
import { UserData } from "../../core/entities/Interface";


export default function SearchProfiles(){
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(new UserData({
        id_user: 1,
        username: '',
        password: ''
    }));

    async function indexURLSFromProcedure(manager){
        const procedureResponse = await manager.callStoredProcedure( userData.id_user);
        if (procedureResponse.status === 200) {
            const rowsAffected = procedureResponse.result[0];
            rowsAffected.forEach(row => {
                manager.indexURL(row);
                manager.updateIndexURL(row);
            });
        }else{
            console.error("Error al ejecutar el procedimiento almacenado:", procedureResponse);
            throw new Error(procedureResponse);
        }
    }
    async function getURLS(manager){
        const response = await manager.getUrlsAndProfilesName(userData);
        if (response.status === 200) {
            const responseData = await response.result;
            setProfiles(responseData);
            setLoading(false);
            return responseData;
        }else{
            console.error("Error al obtener los urls y nombres de perfiles:", response);
            throw new Error(response);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const manager = new HandlerManager();
                indexURLSFromProcedure(manager);
                getURLS(manager);
            } catch (error) {
                console.error("Error al obtener o asignar los urls:", error);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Cargando perfiles...</div>
        // Se puede poner otro elemento mas bonito
    }

    return (
        <div className="container p-8 mx-auto mt-8 border border-gray-300 rounded-lg">
            <h1 className="mb-4 text-2xl font-bold">PERFILES DE BUSQUEDA</h1>
            <SearchProfileTable profiles={ profiles } />
            <NewProfile />
        </div>
    );
};
