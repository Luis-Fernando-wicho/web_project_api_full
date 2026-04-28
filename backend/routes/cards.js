const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

const {
  validateCardBody,
  validateCardId,
} = require("../middlewares/validation");

// GET /cards — devuelve todas las tarjetas
router.get("/", getCards);

// POST /cards — crea una nueva tarjeta
router.post("/", validateCardBody, createCard);

// DELETE /cards/:cardId — elimina una tarjeta por _id
router.delete("/:cardId", validateCardId, deleteCard);

// PUT /cards/:cardId/likes — dar like a una tarjeta
router.put("/:cardId/likes", validateCardId, likeCard);

// DELETE /cards/:cardId/likes — dar unlike a una tarjeta
router.delete("/:cardId/likes", validateCardId, dislikeCard);

module.exports = router;
