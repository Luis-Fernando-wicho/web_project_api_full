const { errorLogger } = require("./logger");

const logErrors = (err, req, res, next) => {
  errorLogger.error({
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });
  next(err);
};

module.exports = logErrors;
