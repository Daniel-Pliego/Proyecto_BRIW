import { InsertUrlCommand, DeleteUrlCommand, GetUrlsAndProfilesCommand, InsertProfileCommand, DeleteProfileCommand, IndexURLCommand, CallStoredProcedureCommand, updateIndexURLCommand } from './HandlerCommand'; 

export default class HandlerManager {
    constructor() {
    }

    async insertProfile(dataProfile) {
        const insertProfileCommand = new InsertProfileCommand(dataProfile);
        let responseProfile = await insertProfileCommand.execute();

        const idProfile = responseProfile.result.insertId;
        return idProfile;
    }

    async insertURL(data) {
        const insertCommand = new InsertUrlCommand(data);
        let response = await insertCommand.execute();
    }

    async getUrlsAndProfilesName(data) {
        const getCommand = new GetUrlsAndProfilesCommand(data);
        const response = await getCommand.execute();
        return response;
    }

    async indexURL(data){
        const indexCommand = new IndexURLCommand(data);
        const response = await indexCommand.execute();
        return response;
    }

    async callStoredProcedure(data) {
        const callCommand = new CallStoredProcedureCommand(data);
        const response = await callCommand.execute();
        return response;
    }

    async deleteURL(data) {
        const deleteCommand = new DeleteUrlCommand(data); 
        let response = await deleteCommand.execute();
    }

    async deleteProfile(data){
        const deleteProfileCommand = new DeleteProfileCommand(data);
        let response = await deleteProfileCommand.execute();
    }

    async updateIndexURL(data){
        const updateCommand = new updateIndexURLCommand(data);
        const response = await updateCommand.execute();
        console.log("LA RESPUESTA ES: ", response);
        return response;
    }
}
