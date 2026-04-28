const router = require("express").Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

const {
  validateUserId,
  validateUpdateProfile,
  validateUpdateAvatar,
} = require("../middlewares/validation");

// GET /users — devuelve todos los usuarios
router.get("/", getUsers);

// GET /users/me — devuelve información sobre el usuario actual
router.get("/me", getCurrentUser);

// GET /users/:userId — devuelve un usuario por _id
router.get("/:userId", validateUserId, getUserById);

// PATCH /users/me — actualizar el perfil
router.patch("/me", validateUpdateProfile, updateProfile);

// PATCH /users/me/avatar — actualizar el avatar
router.patch("/me/avatar", validateUpdateAvatar, updateAvatar);

module.exports = router;
