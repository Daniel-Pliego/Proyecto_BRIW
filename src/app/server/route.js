import { Message } from '@mui/icons-material';
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

export async function POST(request) {
  try {
    console.log("Solicitaron un POST");
    const requestBody = await request.text();
    // console.log("Request body:", requestBody);
    let results = await db.query(requestBody);
    return new Response(JSON.stringify({ status: 200, result: results }));
  } catch (error) {
    throw error;
  }
}


export async function DELETE(request) {
  try {
    console.log("Solicitaron un DELETE");
    const requestBody = await request.text();
    //console.log("Request body:", requestBody);
    let results = await db.query(requestBody);
    return new Response(JSON.stringify({ status: 200, Message: 'Usuario eliminado correctamente', result: results }));
  } catch (error) {
    throw error;
  }
}