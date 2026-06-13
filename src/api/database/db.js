import mysql2 from "mysql2/promise";
import environments from "../config/environments.js";

const { database } = environments;

const connection = mysql2.createPool({
  host: database.host,
  user: database.user,
  password: database.password,
  database: database.name,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
});

export default connection;
