const express = require("express");
const router = express.Router();
const { getQueueStatus, resetQueue } = require("../controllers/queueController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", protect, getQueueStatus);
router.post("/reset", protect, adminOnly, resetQueue);

module.exports = router;
