const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// Función personalizada para validar URLs
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Validación para crear tarjetas
const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});

// Validación para crear usuarios
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// Validación para login
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// Validación para parámetros de ID
const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  validateCreateCard,
  validateCreateUser,
  validateLogin,
  validateUserId,
  validateCardId,
};
