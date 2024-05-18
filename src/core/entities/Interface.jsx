class UrlData {
    constructor (data) {
        this.url = data.url;
        this.name = data.name;
        this.frecuency = data.frecuency || null;
        this.id_profile = data.id_profile;
        this.id = data.id || null;
        this.visited = data.visited || null;
    }
}

class UserData {
    constructor (data) {
        this.id_user = data.id_user;
        this.username = data.username;
        this.password = data.password;
    }
}

class ProfileData {
    constructor (data) {
        this.id_user = data.id_user;
        this.name = data.name;
        this.id_profile = data.id_profile;
    }
}

export { UrlData, ProfileData, UserData };