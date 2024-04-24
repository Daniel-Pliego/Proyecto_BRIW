//https://nextjs.org/docs/app/building-your-application/routing/route-handlers
//https://dev.to/this-is-learning/readwrite-on-local-json-file-with-nextjs-part-51-8gg

import {initCrawler} from "../../../../../public/script/crawler/crawler.js";
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'json/urlbase.json');

// query is "hello" for /api/search?query=hello
  //http://localhost:3000/indexer/read
export async function GET (request, { params }) {
        
        const slug = params.slug;
        if(slug === 'index'){
            await initCrawler();
            return new Response(
              JSON.stringify({ message: "Files uploaded successfully" }),
              {
                headers: { "Content-Type": "application/json" },
              }
            );
        }else if(slug === 'read'){
          try {
            const jsonData = await fsPromises.readFile(dataFilePath);
            const objectData = JSON.parse(jsonData);
            return Response.json(objectData);
          } catch (error) {
              console.error('Error reading file:', error);
              return Response.json({ error: 'Failed to read data' });
          }
        }
}

export async function POST (request, { params }) {
    try {
        const res = await request.json()
        const slug = params.slug;
         const updatedData = JSON.stringify(res);
         await fsPromises.writeFile(dataFilePath, updatedData, { flag: 'w' });

        return Response.json({ message: "Datos actualizados correctamente" });
      } catch (error) {
        console.error(error);
        return Response.json({ message: "Error al actualizar los datos" });
      }
}
