class UrlData {
    constructor(data) {
        this.url = data.url;
        this.nombre = data.nombre;
        this.frecuencia = data.frecuencia || null;
        this.perfil_busqueda_id = data.perfil_busqueda_id;
        this.id = data.id || null;
        this.visitado = data.visitado || null;
    }
}

class ProfileData {
    constructor(data) {
        this.nombre_perfil_busqueda = data.nombre_perfil_busqueda;
    }
}

export { UrlData, ProfileData };