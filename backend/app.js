const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { JWT_SECRET } = require("./config");
const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const {
  validateLogin,
  validateCreateUser,
} = require("./middlewares/validation");
const errorHandler = require("./middlewares/errorHandler");
const NotFoundError = require("./errors/NotFoundError");

const { PORT = 3000, DB_URL = "mongodb://localhost:27017/aroundb" } =
  (process.env.JWT_SECRET = JWT_SECRET);

const app = express();
// Configuración de CORS

app.use(
  cors({
    origin: "http://localhost:5173", // Asegúrate de que coincida con tu navegador
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Incluye OPTIONS
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// DEBUG: Inserta esto antes de tus app.use() finales
console.log("DEBUG: errorLogger es:", errorLogger);
console.log("DEBUG: errorHandler es:", errorHandler);

// Configuración de seguridad
app.use(helmet());

// Configuración de rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Conexión a MongoDB
mongoose.connect(DB_URL);

// Middleware para parsear JSON
app.use(express.json());

// Logger de requests
app.use(requestLogger);

// Ruta de prueba de caída del servidor (solo para testing)
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

// Rutas públicas (sin autenticación)
app.post("/signin", validateLogin, login);
app.post("/signup", validateCreateUser, createUser);

// Middleware de autenticación para rutas protegidas
app.use(auth);

// Rutas protegidas
app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  next(new NotFoundError("Recurso solicitado no encontrado"));
});

// Logger de errores
app.use(errorLogger);

// Manejo de errores de celebrate
app.use(errors());

// Manejo centralizado de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
