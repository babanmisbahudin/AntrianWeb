const express = require("express");
const router = express.Router();
const {
  tambahVideo,
  getVideos,
  hapusVideo,
} = require("../controllers/videoController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// 🟢 Ambil semua video (siapapun yang login bisa lihat, kalau mau bebas bisa tanpa protect)
router.get("/", getVideos); // ← saya ingin ini public

// ➕ Tambah video (admin only)
router.post("/", protect, adminOnly, tambahVideo);

// ❌ Hapus video (admin only)
router.delete("/:id", protect, adminOnly, hapusVideo);

module.exports = router;
