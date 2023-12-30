import mysql from 'mysql2'

export const database = mysql.createConnection({
  // host: process.env.DATABASE_HOST,
  // user: process.env.DATABASE_USERNAME,
  // password: process.env.DATABASE_PASSWORD,
  // database: process.env.DATABASE_NAME,
  // port: process.env.DATABASE_PORT,
  host: '172.17.224.1',
  user: 'root',
  password: 'rootadmin123',
  database: process.env.DATABASE_NAME,
  port: 3306 // remove port
})

// move this to server.ts
database.connect((err) => {
  if (err) {
    // throw err;
    console.log('Connection failed!', err)
  } else {
    console.log('Successfully connected to the database.')
  }
})
