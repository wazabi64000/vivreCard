import mysql from "mysql2/promise";
import { env } from "./env.js";

export const db = mysql.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 80,
});

 

const connection = await db.getConnection();
console.log("Db connexion !!", env.DB_NAME);
connection.release();
