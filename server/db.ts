import mysql from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config({ path: __dirname + "/.env" })

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: process.env.DB_CHARSET,
  namedPlaceholders: true,
})

// db.createConnect((err) => {
//   if (err) throw err
//   console.log("mysql connected !!")
// })

export default pool
