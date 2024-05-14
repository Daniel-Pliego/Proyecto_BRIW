import { InsertUrlCommand, DeleteUrlCommand } from '../HandlerCommand'; 

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
}
