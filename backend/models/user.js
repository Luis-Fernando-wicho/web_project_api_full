const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorador",
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator: function (v) {
        return validator.isURL(v);
      },
      message: "Debe ser una URL válida",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: "Debe ser un email válido",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const bcrypt = require("bcryptjs"); // Asegúrate de tener esto importado

userSchema.statics.findUserByCredentials = function (email, password) {
  // .select('+password') es CRUCIAL porque en el schema pusiste 'select: false'
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Correo o contraseña incorrectos"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Correo o contraseña incorrectos"));
        }
        return user; // Si todo es correcto, devuelve el objeto usuario
      });
    });
};

module.exports = mongoose.model("user", userSchema);
