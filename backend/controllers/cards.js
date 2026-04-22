const Card = require("../models/card");

// GET /cards - Obtener todas las tarjetas
module.exports.getCards = (req, res, next) => {
  Card.find()
    .then((cards) => res.send(cards))
    .catch(next);
};

// POST /cards - Crear una nueva tarjeta
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id, // Obtiene el ID del usuario autenticado
  })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

// DELETE /cards/:cardId - Eliminar una tarjeta
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        const error = new Error("Tarjeta no encontrada");
        error.statusCode = 404;
        throw error;
      }

      // Verificar que el usuario sea el propietario
      if (card.owner.toString() !== req.user._id) {
        const error = new Error(
          "No tienes permisos para eliminar esta tarjeta",
        );
        error.statusCode = 403;
        throw error;
      }
      // Si es el dueño, puede eliminarla
      return Card.findByIdAndDelete(req.params.cardId);
    })
    .then((card) => res.send(card))
    .catch(next);
};

// PUT /cards/:cardId/likes - Dar like
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // Agrega _id al array si no está
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const error = new Error("Tarjeta no encontrada");
        error.statusCode = 404;
        throw error;
      }
      res.send(card);
    })
    .catch(next);
};

// DELETE /cards/:cardId/likes - Quitar like
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // Elimina _id del array
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const error = new Error("Tarjeta no encontrada");
        error.statusCode = 404;
        throw error;
      }
      res.send(card);
    })
    .catch(next);
};
