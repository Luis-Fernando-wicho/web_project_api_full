const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const auth = require("./middlewares/auth");
const { createUser, login } = require("./controllers/users");
const { validateSignup, validateSignin } = require("./middlewares/validation");
const errorHandler = require("./middlewares/error-handler");

const app = express();
const { PORT = 3000 } = process.env;

// Conectar a MongoDB
mongoose.connect("mongodb://localhost:27017/aroundb");

// Middlewares
app.use(cors());
app.use(express.json());

// Logger de solicitudes
app.use(requestLogger);

// Ruta de prueba de caída del servidor (solo para testing)
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

// Rutas públicas (sin autenticación)
app.post("/signup", validateSignup, createUser);
app.post("/signin", validateSignin, login);

// Middleware de autenticación para todas las rutas siguientes
app.use(auth);

// Rutas protegidas
app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

// Logger de errores
app.use(errorLogger);

// Manejo de errores de celebrate
app.use(errors());

// Manejo centralizado de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
