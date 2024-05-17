import axios from 'axios';
const URL = process.env.CRAWLER_API_URL;

class ActionStrategy {
    async execute () {}
  }
  
export class CreateCoreAction extends ActionStrategy {

    constructor (Formdata) {
      super();
      this.formData = Formdata;
    }

    dataToSend (){
      return {
        id: 1,
        corename: this.formData.get("corename"),
        estado: true,
      };
    }

    async execute () {
      try{
        await axios.post(URL+"/cores", this.dataToSend());
        return new Response(
          JSON.stringify({ message: "Core created successfully" }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      }catch (error){
        return new Response(
          JSON.stringify({ message: "Error creating core" }),
          {
            headers: { "Content-Type": "application/json" },
            status: 500,
          }
        );
      }
    }
  }

  export class IndexPageAction extends ActionStrategy {
    constructor (Formdata) {
      super();
      this.formData = Formdata;
    }

    dataToSend (){
      return {
        id: 1,
        url: this.formData.get("url"),
        estado: true,
      };
    }

    async execute () {
      try{
        await axios.post(URL+"/pages", this.dataToSend());
        return new Response(
          JSON.stringify({ message: "Page indexed successfully" }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      }catch (error){
        return new Response(
          JSON.stringify({ message: "Error index page" }),
          {
            headers: { "Content-Type": "application/json" },
            status: 500,
          }
        );
      }
    }
  }
  
export class NotFoundAction extends ActionStrategy {
    async execute () {
      return new Response(
        JSON.stringify({ message: "Action not found" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 404,
        }
      );
    }
  }
