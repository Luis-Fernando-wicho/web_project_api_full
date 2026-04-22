const errorHandler = (err, req, res, next) => {
  // Manejo centralizado de todos los errores
  const { statusCode = 500, message } = err;

  res.status(statusCode).json({
    message:
      statusCode === 500 ? "Se ha producido un error en el servidor" : message,
  });
};

module.exports = errorHandler;
