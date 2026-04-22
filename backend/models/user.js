const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Jacques Cousteau", // Valor por defecto
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Explorador", // Valor por defecto
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Debe ser una URL válida",
    },
  },
  // ← NUEVOS CAMPOS PARA AUTENTICACIÓN
  email: {
    type: String,
    required: true, // Obligatorio
    unique: true, // Único en la base de datos
    validate: {
      validator: (v) => validator.isEmail(v), // Validación de email
      message: "Debe ser un email válido",
    },
  },
  password: {
    type: String,
    required: true, // Obligatorio
    minlength: 8, // Mínimo 8 caracteres
    select: false, //Evitar que la API devuelva el hash de la contraseña
  },
});

module.exports = mongoose.model("user", userSchema);
