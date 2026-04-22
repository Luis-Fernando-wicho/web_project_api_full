const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // obtener la autorización del encabezado
  const { authorization } = req.headers;

  // comprobar que el encabezado existe y comienza con 'Bearer '
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Se requiere autorización" });
  }

  // obtener el token
  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    // verificar el token
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    // devolver un error si algo va mal
    return res.status(401).send({ message: "Se requiere autorización" });
  }

  req.user = payload; // asignar el payload al objeto de solicitud
  next(); // enviar la solicitud al siguiente middleware
};
