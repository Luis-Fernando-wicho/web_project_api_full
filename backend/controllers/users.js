const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// GET /users - devuelve todos los usuarios
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// GET /users/:userId - devuelve un usuario por _id
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      res.send({ data: user });
    })
    .catch(next);
};

// GET /users/me - devuelve información sobre el usuario actual
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      res.send({ data: user });
    })
    .catch(next);
};

// POST /signup - crear un usuario
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }),
    )
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      res.send({ data: userObject });
    })
    .catch(next);
};

// POST /signin - autenticar usuario
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .send({ message: "Email o contraseña incorrectos" });
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return res
            .status(401)
            .send({ message: "Email o contraseña incorrectos" });
        }

        const token = jwt.sign({ _id: user._id }, "some-secret-key", {
          expiresIn: "7d",
        });

        res.send({ token });
      });
    })
    .catch(next);
};

// PATCH /users/me - Actualizar perfil
module.exports.updateProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    ).orFail();

    res.json(user);
  } catch (error) {
    if (error.name === "DocumentNotFoundError") {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Datos inválidos proporcionados" });
    }
    res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
  }
};

// PATCH /users/me/avatar - Actualizar avatar
module.exports.updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    ).orFail();

    res.json(user);
  } catch (error) {
    if (error.name === "DocumentNotFoundError") {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Datos inválidos proporcionados" });
    }
    res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
  }
};
