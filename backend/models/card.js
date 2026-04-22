const mongoose = require("mongoose");
const validator = require("validator");

// Misma expresión regular para validar URLs
const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9\-._~:/?%#[\]@!$&'()*+,;=]+#?$/;

// Esquema para Card
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (url) {
        return urlRegex.test(url);
      },
      message: "El link debe ser una URL válida",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Exportar el modelo
module.exports = mongoose.model("card", cardSchema);
