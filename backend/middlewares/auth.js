const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .send({ message: "Formato de autorización incorrecto" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    console.log("Error de verificación JWT:", err.message); // <--- ESTO NOS DIRÁ LA VERDAD
    return res.status(401).send({ message: "Token inválido o expirado" });
  }
};
