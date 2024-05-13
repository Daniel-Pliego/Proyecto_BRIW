import {CreateCoreAction, IndexPageAction, NotFoundAction} from "./strategy.js";

export async function POST (request) {
  try{
    const formData = await request.formData();
    const action = formData.get("action");
    const actions = {
      "createCore": new CreateCoreAction(formData),
      "indexPage": new IndexPageAction(formData),
    };
  
    const strategy = actions[action] || new NotFoundAction();
    
    return await strategy.execute();
  }catch (error){
    return new Response(
      JSON.stringify({ message: "Error indexer" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}