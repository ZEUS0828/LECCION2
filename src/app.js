import cors from "cors"; // Importa cors para manejar permisos de acceso
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Importa las rutas
import trabajadorRoutes from "./routes/trabajador.routes.js";
import clienteRoutes from "./routes/cliente.routes.js";
import consumoRoutes from "./routes/consumo.routes.js";
import medidorRoutes from "./routes/medidor.routes.js";
import rutaRoutes from "./routes/ruta.routes.js";

// Define el módulo de ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: "*", // Permite todas las IPs
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true, // Permite credenciales
};

app.use(cors(corsOptions)); // Aplica configuración de CORS
app.use(express.json()); // Permite interpretar JSON en el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true })); // Permite interpretar formularios codificados
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // Define una carpeta estática para uploads

// Rutas
app.use("/api", trabajadorRoutes); // Rutas para trabajadores
app.use("/api", clienteRoutes); // Rutas para clientes
app.use("/api", consumoRoutes); // Rutas para consumo
app.use("/api", medidorRoutes); // Rutas para medidores
app.use("/api", rutaRoutes); // Rutas para rutas

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    message: "Ruta no encontrada",
  });
});

export default app;
