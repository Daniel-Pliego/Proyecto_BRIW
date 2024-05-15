import { UrlData, ProfileData, UserData } from '../components/Interface';

class HandlerCommand {
    constructor(data){
        this.data = data;
    }

    async execute (){}
}

export class GetUrlsAndProfilesCommand extends HandlerCommand {
    constructor(data) {
        super(data);
    }

    async execute(){
        const userData = new UserData(this.data);
        let query = `SELECT urls.*, Uprofiles.name AS profile_name , Uprofiles.id AS id_perfil, Uprofiles.created ` +
                    `FROM urls ` +
                    `RIGHT JOIN users_profiles AS Uprofiles ON urls.id_profile = Uprofiles.id ` +
                    `WHERE Uprofiles.id_user = ${userData.id_user} ` +
                    `ORDER BY Uprofiles.created;`;

        const endpoint = `/server?query=${query}`;
        
        try {
            const response = await fetch(endpoint, {
                method: "GET",
            });
            if (response.ok) {
                const dataResponse = await response.json();
                return dataResponse;
            }
        } catch (error) {
            console.error("Error al obtener URLs y nombres de perfiles del usuario:", error);
        }
    }
}

export class InsertUrlCommand extends HandlerCommand {
    
    constructor(data) {
        super(data);
    }

    async execute(){
        const urlData = new UrlData(this.data);
        let query = `INSERT INTO urls (id_profile, name, url, frecuency) VALUES (${urlData.id_profile}, '${urlData.name}', '${urlData.url}', ${urlData.frecuency});`;
        
        try {
            const response = await fetch("/server", {
                method: "POST",
                body: query,
            });
            if (response.ok) {
                const dataResponse = await response.json();
                console.log("dataResponse: ", dataResponse);
            }
        } catch (error) {
            console.error("Error al insertar URL:", error);
        }
    }
}

export class DeleteUrlCommand extends HandlerCommand {
    constructor(data) {
        super(data);
    }

    async execute(){
        const urlData = new UrlData(this.data);
        let query = `DELETE FROM urls WHERE id = ${urlData.id};`;
        
        try {
            const response = await fetch("/server", {
                method: "DELETE",
                body: query,
            });
            if (response.ok) {
                const dataResponse = await response.json();
                console.log("dataResponse: ", dataResponse);
            }
        } catch (error) {
            console.error("Error al eliminar URL:", error);
        }
    }
}

export class InsertProfileCommand extends HandlerCommand {
    constructor(data) {
        super(data);
    }

    async execute(){
        const profileData = new ProfileData(this.data);
        let query = `INSERT INTO users_profiles (id_user, name) VALUES (${profileData.id_user}, '${profileData.name}');`;
        
        try {
            const response = await fetch("/server", {
                method: "POST",
                body: query,
            });
            if (response.ok) {
                const dataResponse = await response.json();
                console.log("dataResponse: ", dataResponse);
                return dataResponse;
            }
        } catch (error) {
            console.error("Error al insertar profile:", error);
        }
    }

}

export class DeleteProfileCommand extends HandlerCommand {
    constructor(data) {
        super(data);
    }

    async execute(){
        const id_profile =this.data;
        let query = `DELETE FROM users_profiles WHERE id = ${id_profile};`;
        try {
            const response = await fetch("/server", {
                method: "DELETE",
                body: query,
            });
            if (response.ok) {
                const dataResponse = await response.json();
                console.log("dataResponse: ", dataResponse);
            }
        } catch (error) {
            console.error("Error al eliminar Perfil:", error);
        }
    }
}


function HandlerEdit() {
    console.log("Editando...");
}

function HandlerDetele() {
    console.log("Eliminando...");
}

function HandlerIndexar() {
    console.log("Indexando...");
}

export { HandlerEdit, HandlerDetele, HandlerIndexar};