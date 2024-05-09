import mysql from 'serverless-mysql';
require('dotenv').config();

const db =mysql ({
  config: {
    host:     process.env.HOST,
    database: process.env.DATABASE,
    user:     process.env.NOMBRE,
  }
});

// console.log("HOST: ", process.env.HOST);
// console.log("DATABASE: ", process.env.DATABASE);
// console.log("USERNAME: ", process.env.NOMBRE);
// console.log("--------------------------------------");

export async function POST (request) {

  try {
    const requestBody = await request.text();
    //console.log("Request body:", requestBody);

    let results = await db.query(requestBody);
    return new Response(JSON.stringify({ status: 200, usuarios: results })
    );
  } catch (error) {
    throw error;
  }
}












// const express = require('express');
// const app = express();
// const port = 3306;

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`)
// });

// const express = require('express');
// const mongodb = require('mongodb');
// const app = express();
// const port = 3001;

// const MongoClient = mongodb.MongoClient;
// const url = "mongodb://localhost:27017/mydb";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database connected!");
//   db.close();
// });

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`)
// });

// Require and initialize outside of your main handler
// route.js

// const mysql = require('serverless-mysql')({
//   config: {
//     host     : process.env.ENDPOINT,
//     database : process.env.DATABASE,
//     user     : process.env.USERNAME,
//     password : process.env.PASSWORD
//   }
// });

// async function handleRequest(event, context) {
//   try {
//     // Run your query
//     let results = await mysql.query('SELECT * FROM usuarios')

//     // Run clean up function
//     await mysql.end()

//     // Return the results
//     console.log(results)
//     return results
//   } catch (error) {
//     console.error("Error al ejecutar la consulta:", error);
//     throw error;
//   }
// }

// module.exports = { handleRequest };

// route.js

// function handleGet(req, res) {
//   try {
//     const data = obtenerDatos();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Error al procesar la solicitud:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// }

// function handlePost(req, res) {
//   try {
//     const data = req.body;
//     if (!data) {
//       throw new Error("Datos faltantes en la solicitud");
//     }
//     res.status(201).json({ message: "Datos recibidos correctamente", data });
//   } catch (error) {
//     console.error("Error al procesar la solicitud:", error);
//     res.status(400).json({ error: error.message });
//   }
// }

// function handleDelete (req, res) {
//   try {
//     const data = req.body;
//     if (!data) {
//       throw new Error("Datos faltantes en la solicitud");
//     }
//     res.status(200).json({ message: "Datos eliminados correctamente", data });
//   } catch (error) {
//     console.error("Error al procesar la solicitud:", error);
//     res.status(400).json({ error: error.message });
//   }
// }

// function handlePut (req, res) {
//   try {
//     const data = req.body;
//     if (!data) {
//       throw new Error("Datos faltantes en la solicitud");
//     }
//     res.status(200).json({ message: "Datos actualizados correctamente", data });
//   } catch (error) {
//     console.error("Error al procesar la solicitud:", error);
//     res.status(400).json({ error: error.message });
//   }
// }

// async function obtenerDatos() {
//   try {
//         let results = await mysql.query('SELECT * FROM usuarios')
    
//         await mysql.end()
//         return results
//   } catch (error) {
//     console.error("Error al ejecutar la consulta:", error);
//     throw error;
//   }
// }

// // Las funciones handlePut y handleDelete seguirían un patrón similar
// module.exports = { handleGet, handlePost, handleDelete, handlePut}

// route.js

  