const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const { deleteUser } = require("../controllers/userController");
const { updateUser } = require("../controllers/userController");

router.post("/register", protect, adminOnly, registerUser); // hanya admin bisa tambah user
router.post("/login", loginUser);
router.get("/", protect, adminOnly, getAllUsers); // ambil semua user
router.delete("/:id", protect, adminOnly, deleteUser);
router.put("/:id", protect, adminOnly, updateUser);

module.exports = router;
