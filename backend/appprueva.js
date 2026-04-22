const express = require("express");
const mongoose = require("mongoose");
/* const cors = require("cors");
const { errors } = require("celebrate");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit"); */

const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
/* const { requestLogger, errorLogger } = require("./middlewares/logger");
const { validateSignin, validateSignup } = require("./middlewares/validation");
const errorHandler = require("./middlewares/errorHandler");
const NotFoundError = require("./errors/NotFoundError"); */

const { PORT = 3000, DB_URL = "mongodb://localhost:27017/aroundb" } =
  process.env;

const app = express();

/* // Configuración de seguridad
app.use(helmet());

// Configuración de rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por ventana de tiempo
});
app.use(limiter);

// Configuración de CORS
app.use(cors());
app.options("*", cors());
 */
// Conexión a MongoDB
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
app.post("/signin", validateSignin, login);
app.post("/signup", validateSignup, createUser);

// Middleware de autenticación para rutas protegidas
app.use(auth);

// Rutas protegidas
app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

// Manejo de rutas no encontradas
app.use("*", (req, res, next) => {
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
