import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const database = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

export default database;
