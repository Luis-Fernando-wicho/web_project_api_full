const router = require("express").Router();
const { validateUserId } = require("../middlewares/validation");
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

// GET /users - devuelve todos los usuarios
router.get("/", getUsers);

// GET /users/:userId - devuelve un usuario por _id
router.get("/:userId", validateUserId, getUserById);

// GET /users/me - devuelve información sobre el usuario actual
router.get("/me", getCurrentUser);

// PATCH /users/me - actualizar el perfil
router.patch("/me", updateProfile);

// PATCH /users/me/avatar - actualizar el avatar
router.patch("/me/avatar", updateAvatar);

module.exports = router;
