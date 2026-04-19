const mongoose = require("mongoose");
// conectarte a MongoDB
const express = require("express");
// Importa la librería Express
const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");
//usar routes
const fs = require("fs").promises;
//módulo de Node para interactuar con el sistema de archivos (leer, escribir).
// Usamos .promises para poder usar async/await.
const path = require("path");
//Ayuda a construir rutas de carpetas de forma segura

const app = express();
// Crea una aplicación Express

const PORT = 3000;
// Define el puerto donde correrá el servidor

/////////////////////////////////////////////////////////////////////////////

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("✅ Conectado a MongoDB");
  })
  .catch((error) => {
    console.error("❌ Error conectando a MongoDB:", error);
  });

/////////////////////////////////////////////////////////////////////////////

// Middleware temporal para autorización
app.use((req, res, next) => {
  req.user = {
    _id: "65f1a2b3c4d5e6f7a8b9c0d1", // Reemplaza con el _id de tu usuario de prueba
  };
  next();
});

//  las rutas que empiecen con /users serán manejadas por userRoutes
app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

/////////////////////////////////////////////////////////////////////////////

/* // Ruta GET /users - Devolver todos los usuarios
app.get("/users", async (req, res) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "data", "users.json"),
      "utf8",
      //direccion del archivo que buscamos
    );
    const users = JSON.parse(data);
    //Convierte el texto plano del archivo en un objeto o array de JavaScript.
    res.json(users);
    //convierte el objeto de nuevo a texto JSON
    // y configura las cabeceras del navegador
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
    //Envía el código de estado HTTP 500 (Internal Server Error).
  }
});

/////////////////////////////////////////////////////////////////////////////

// Ruta GET /cards - Devolver todas las tarjetas
app.get("/cards", async (req, res) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "data", "cards.json"),
      "utf8",
    );
    const cards = JSON.parse(data);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
});

/////////////////////////////////////////////////////////////////////////////

app.get("/users/:id", async (req, res) => {
  try {
    // Obtener el ID desde los parámetros de la URL
    const userId = req.params.id;

    // Leer el archivo users.json
    const data = await fs.readFile(
      path.join(__dirname, "data", "users.json"),
      "utf8",
    );
    const users = JSON.parse(data);

    // Buscar el usuario con el ID específico
    const user = users.find((u) => u._id === userId);

    // Si no se encuentra el usuario, devolver error 404
    if (!user) {
      return res.status(404).json({ message: "ID de usuario no encontrado" });
    }

    // Si se encuentra, devolver el usuario
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
}); */

/* // Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});
 */
/////////////////////////////////////////////////////////////////////////////

//Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

/////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
// Inicia el servidor y muestra un mensaje
