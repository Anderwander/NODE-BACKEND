import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  port: 3308,
  user: "root",
  password: "miPetank",
  database: "petanca",
});

export default connection;
