import fsPromises from 'fs/promises';
import path from 'path';

//lo llamo en crawler
const dataFilePath = path.join(process.cwd(), 'json/urlbase.json');
export async function POST(request) {
    try {
        const res = await request.json()
         const updatedData = JSON.stringify(res);
         await fsPromises.writeFile(dataFilePath, updatedData, { flag: 'w' });

        return Response.json({ message: "Datos actualizados correctamente" });
      } catch (error) {
        console.error(error);
        return Response.json({ message: "Error al actualizar los datos" });
      }
  }