// routes/hargaEmasRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllHarga,
  addHarga,
  updateHarga,
  deleteHarga
} = require("../controllers/hargaEmasController");

// GET semua data harga emas
router.get("/", getAllHarga);

// POST tambah harga emas
router.post("/", addHarga);

// PUT update semua harga emas
router.put("/", updateHarga);

// DELETE satu baris harga emas
router.delete("/:id", deleteHarga);

module.exports = router;
