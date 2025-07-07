const express = require("express");
const router = express.Router();
const {
  tambahAntrian,
  getAntrian,
  resetAntrian,
  updateStatus,
} = require("../controllers/antrianController");

router.post("/", tambahAntrian);
router.get("/", getAntrian);
router.delete("/reset", resetAntrian);
router.put("/:id/status", updateStatus);

module.exports = router;
