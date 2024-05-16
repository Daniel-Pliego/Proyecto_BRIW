"use server"
import { Message } from '@mui/icons-material';
import { db } from '../infra/databaseConnections/dbConnection.js';

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

export async function GET(request) {
  try {
    console.log("Solicitaron un GET");
    const queryParams = new URLSearchParams(request.url.split('?')[1]);
    const query = queryParams.get('query');
    // console.log("Consulta recibida:", query);
    let results = await db.query(query);
    return new Response(JSON.stringify({ status: 200, result: results }));
  } catch (error) {
    throw error;
  }
}

export async function PUT(request) {
  try {
    console.log("Solicitaron un PUT");
    const requestBody = await request.text();
    // console.log("Request body:", requestBody);
    let results = await db.query(requestBody);
    return new Response(JSON.stringify({ status: 200, result: results }));
  } catch (error) {
    throw error;
  }
}

