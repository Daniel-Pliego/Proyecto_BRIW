//https://nextjs.org/docs/app/building-your-application/routing/route-handlers
//https://dev.to/this-is-learning/readwrite-on-local-json-file-with-nextjs-part-51-8gg

import {initCrawler} from "public/script/crawler/crawler.js";
import fsPromises from 'fs/promises';
import path from 'path';
import axios from 'axios';
const FormData = require('form-data');
const fs = require('fs');

const dataFilePath = path.join(process.cwd(), 'json/urlbase.json');

// query is "hello" for /api/search?query=hello
  //http://localhost:3000/indexer/read
export async function GET(request, { params }) {
        const slug = params.slug;
        if(slug === 'index'){
            await initCrawler();
            return Response.json({ helo:"indexado" });
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

export async function POST(request, { params }) {
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

  async function enviarArchivoASolr() {
    const filePath = 'C:\\Users\\jonat\\OneDrive\\Documentos\\7toSemestre\\busquedaWeb\\solr-8.11.2\\example\\exampledocs\\Welcome.pdf';
    const solrUrl = 'http://localhost:8983/solr/v10/update/extract?literal.id=doc920&commit=true';
    
    const formData = new FormData();
    formData.append('myfile', fs.createReadStream(filePath));
    
    axios.post(solrUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    })
      .then(response => {
        console.log('Respuesta de Solr:', response.data);
      })
      .catch(error => {
        console.error('Error al enviar el archivo a Solr:', error);
      });
  }