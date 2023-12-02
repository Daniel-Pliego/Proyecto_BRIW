import fs from "fs";
import path from "path";
import {returnURLFileIndexer} from "public/script/solrClient/solr.js";
import axios from 'axios';
const FormData = require('form-data');

export async function POST(request) {
  // Crear la carpeta "files"
  const uploadDir = path.join(process.cwd(), "files");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // Obtener los archivos
  const formData = await request.formData();
  const files = formData.getAll("files");

  //Subir archivos
  files.forEach(async (file) => {
    const filePath = path.join(uploadDir, file.name);
    const writeStream = fs.createWriteStream(filePath);
    if(!checkFileExists(uploadDir, file.name)){
      let fileBuff = await file.arrayBuffer();
      let fileBuffer = Buffer.from(fileBuff);
  
      writeStream.write(fileBuffer);
      writeStream.end();
      writeStream.on('finish', async () => {
        enviarArchivoASolr(filePath);
        console.log('Archivo enviado a Solr');
      });
    }
  });

  return new Response(
    JSON.stringify({ message: "Files uploaded successfully" }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

const checkFileExists = (directory, fileName) => {
  const filePath = `${directory}/${fileName}`;
  return fs.existsSync(filePath);
};

async function enviarArchivoASolr(filePath) {
  console.log('File Path:', filePath); // Log the file path
  const solrUrl = returnURLFileIndexer();

  try {
    const formData = new FormData();
    formData.append('myfile', fs.createReadStream(filePath));

    const response = await axios.post(solrUrl, formData, {
      headers: formData.getHeaders(),
    });

    console.log('Respuesta de Solr:', response.data);
  } catch (error) {
    console.error('Error al enviar el archivo a Solr:', error);
  }
}