import { InsertUrlCommand, DeleteUrlCommand, GetUrlsAndProfilesCommand, InsertProfileAndURLCommand } from './HandlerCommand'; 

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
        console.log("dataProfile para hacer insert", dataProfile);
        const insertProfileCommand = new InsertProfileAndURLCommand(dataProfile);
        let responseProfile = await insertProfileCommand.execute();

        const idProfile = responseProfile.result.insertId;
        dataURL.id_profile = idProfile;

        console.log("dataURL para hacer insert", dataURL);
        const insertUrlCommand = new InsertUrlCommand(dataURL);
        let responseURL = await insertUrlCommand.execute();
    }
}
