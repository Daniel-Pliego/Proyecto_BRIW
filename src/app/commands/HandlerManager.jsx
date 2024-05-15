import { InsertUrlCommand, DeleteUrlCommand, GetUrlsAndProfilesCommand, InsertProfileCommand, DeleteProfileCommand } from './HandlerCommand'; 

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

    async insertProfileAndURL(dataProfile, dataURL) {
        const insertProfileCommand = new InsertProfileCommand(dataProfile);
        let responseProfile = await insertProfileCommand.execute();

        const idProfile = responseProfile.result.insertId;
        dataURL.id_profile = idProfile;

        const insertUrlCommand = new InsertUrlCommand(dataURL);
        let responseURL = await insertUrlCommand.execute();
    }

    async deleteProfile(data){
        const deleteProfileCommand = new DeleteProfileCommand(data);
        let response = await deleteProfileCommand.execute();
    }
}
