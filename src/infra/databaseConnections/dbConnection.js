import mysql from 'serverless-mysql';
require('dotenv').config();

const db =mysql ({
  config: {
    host:     process.env.HOST,
    database: process.env.DATABASE,
    user:     process.env.NOMBRE,
  }
});

export { db };

// console.log("HOST: ", process.env.HOST);
// console.log("DATABASE: ", process.env.DATABASE);
// console.log("USERNAME: ", process.env.NOMBRE);
// console.log("--------------------------------------");