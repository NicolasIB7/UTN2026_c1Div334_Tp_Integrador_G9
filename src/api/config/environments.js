import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  database: {
    host: process.env.DB_HOST || "localhost",
    name: process.env.DB_NAME || "myapp",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
  },
};
