import { UrlData, ProfileData, UserData } from '../../../core/entities/Interface';
import { POST } from '../../../app/api/indexer/route.js';

class HandlerCommand {
    constructor(data){
        this.data = data;
    }

    async execute (){}
}

function toPlainObject(obj) {
    return JSON.parse(JSON.stringify(obj));
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

        const endpoint = `/api/indexer?query=${query}`;
        
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
            throw new Error(error);
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
            const response = await fetch("/api/indexer", {
                method: "POST",
                body: query,
            });
            if (response.ok) {
                const dataResponse = await response.json();
                console.log("dataResponse: ", dataResponse);
            }
        } catch (error) {
            console.error("Error al insertar URL:", error);
            throw new Error(error);
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
            const response = await fetch("/api/indexer", {
                method: "DELETE",
                body: query,
            });
            if (response.ok) {
                const dataResponse = await response.json();
                console.log("dataResponse: ", dataResponse);
            }
        } catch (error) {
            console.error("Error al eliminar URL:", error);
            throw new Error(error);
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
            const response = await fetch("/api/indexer", {
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
            throw new Error(error);
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
            const response = await fetch("/api/indexer", {
                method: "DELETE",
                body: query,
            });
            if (response.ok) {
                const dataResponse = await response.json();
                console.log("dataResponse: ", dataResponse);
            }
        } catch (error) {
            console.error("Error al eliminar Perfil:", error);
            throw new Error(error);
        }
    }
}

export class IndexURLCommand extends HandlerCommand {
    constructor (data) {
        super(data);
    }

    async execute (){
        const urlData = new UrlData(this.data);
        console.log("urlData a indexar: ", urlData);
        try {
            const formData = new FormData();
            formData.append('action', 'indexPage');
            formData.append('url', urlData.url);
            const response = await fetch("/api/solr", {
                method: "POST",
                body: formData,
            });
            console.log("response: ", response);
            if (response.ok) {
                
                const dataResponse = await response.json();
                console.log("dataResponse: ", dataResponse);
                return dataResponse;
            }
        } catch (error) {
            console.error("Error al indexar URL:", error);
            throw new Error(error);
        }
    }

}

export class CallStoredProcedureCommand extends HandlerCommand {
    constructor(data) {
        super(data);
    }

    async execute(){
        const id_user = this.data;
        console.log("id_user: ", id_user);
        const query = `CALL update_visited_status2(${id_user});`;

        try {
            const response = await fetch("/api/indexer", {
                method: "POST",
                body: query,
            });
            if (response.ok) {
                const dataResponse = await response.json();
                console.log("dataResponse del procedure2: ", dataResponse);
                return dataResponse;
            }
        } catch (error) {
            console.error("Error al llamar procedimiento almacenado:", error);
            throw new Error(error);
        }
    }
}

export class updateIndexURLCommand extends HandlerCommand {
    constructor(data) {
        super(data);
    }

    async execute(){
        const urlData = new UrlData(this.data);
        console.log("urlData a actualizar: ", urlData);
        const query = `UPDATE urls SET name = '${urlData.name}', url = '${urlData.url}', visited = 1, frecuency = ${urlData.frecuency} WHERE id = ${urlData.id};`;

        try {
            const response = await fetch("/api/indexer", {
                method: "PUT",
                body: query,
            });
            if (response.ok) {
                const dataResponse = await response.json();
                console.log("dataResponse: ", dataResponse);
                return dataResponse;
            }
            
        } catch (error) {
            console.error("Error al actualizar URL:", error);
            throw new Error(error);
        }
    }
}