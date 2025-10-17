import mysql from "mysql2/promise";

const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "meubanco",
  database: "medguia_db"
});

export default db;
