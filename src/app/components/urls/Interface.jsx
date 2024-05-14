class UrlData {
    constructor(data) {
        this.url = data.url;
        this.name = data.name;
        this.frecuency = data.frecuency || null;
        this.id_profile = data.id_profile;
        this.id = data.id || null;
        this.visited = data.visited || null;
    }
}

class ProfileData {
    constructor(data) {
        this.nombre_perfil_busqueda = data.nombre_perfil_busqueda;
    }
}

export { UrlData, ProfileData };