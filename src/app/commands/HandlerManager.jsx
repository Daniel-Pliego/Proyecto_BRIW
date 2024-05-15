import { InsertUrlCommand, DeleteUrlCommand, GetUrlsAndProfilesCommand, InsertProfileCommand, DeleteProfileCommand, IndexURLCommand } from './HandlerCommand'; 

export default class HandlerManager {
    constructor() {
    }

    async insertURL(data) {
        const insertCommand = new InsertUrlCommand(data);
        let response = await insertCommand.execute();
    }

    async deleteURL(data) {
        const deleteCommand = new DeleteUrlCommand(data); 
        let response = await deleteCommand.execute();
    }

    async getUrlsAndProfilesName(data) {
        const getCommand = new GetUrlsAndProfilesCommand(data);
        const response = await getCommand.execute();
        return response;
    }

    async insertProfile(dataProfile) {
        const insertProfileCommand = new InsertProfileCommand(dataProfile);
        let responseProfile = await insertProfileCommand.execute();

        const idProfile = responseProfile.result.insertId;
        return idProfile;
    }

    async deleteProfile(data){
        const deleteProfileCommand = new DeleteProfileCommand(data);
        let response = await deleteProfileCommand.execute();
    }

    async indexURL(data){
        const indexCommand = new IndexURLCommand(data);
        const response = await indexCommand.execute();
        return response;
    }
}
