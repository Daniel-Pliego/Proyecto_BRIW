import { InsertUrlCommand, DeleteUrlCommand, GetUrlsAndProfilesCommand } from './HandlerCommand'; 

export default class HandlerManager {
    constructor() {
    }

    async insertURL(data) {
        console.log("data para hacer insert", data);
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
}