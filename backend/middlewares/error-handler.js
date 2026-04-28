module.exports = (err, req, res, next) => {
  // si un error no tiene estado, se muestra 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // comprueba el estado y muestra un mensaje basado en dicho estado
    message:
      statusCode === 500 ? "Se ha producido un error en el servidor" : message,
  });
};
