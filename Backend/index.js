import express from "express";
import cors from "cors";
import environments from "./src/api/config/environments.js";

// Routers de cada recurso
import { productRoutes, userRoutes, saleRoutes } from "./src/api/routes/index.js";

///////////
// Config
const app = express();
const PORT = environments.port;

/////////////////
// Middlewares
app.use(cors()); // Middleware CORS basico para permitir todas las solicitudes

// Middleware logger para mostrar todas las solicitudes por consola
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sales", saleRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
