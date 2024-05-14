import { UrlData, ProfileData } from './urls/Interface';

class HandlerCommand {
    constructor(data){
        this.data = data;
        console.log("HandlerCommand creado");
    }

    async execute (){}
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
        console.log("Eliminando URL...", data || "sin datos");
    }

    async execute(){
        console.log("Eliminando URL...");
        console.log("Data: ", this.data);
        const urlData = new UrlData(this.data);
        console.log("urlData: ", urlData);
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

export class insertProfileCommand extends HandlerCommand {
    constructor(data) {
        super();
        this.data = data;
        console.log("Insertando profile...", data || "sin datos");
    }

    data(){
        const urlData = new UrlData(data);
        return urlData;
    }

}

export class deleteProfileCommand extends HandlerCommand {
    constructor(data) {
        super();
        this.data = data;
        console.log("Eliminando profile...", data || "sin datos");
    }

    data(){
        const urlData = new UrlData(data);
        return urlData;

        //falta implementación
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