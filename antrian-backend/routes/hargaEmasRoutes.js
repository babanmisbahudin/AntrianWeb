const express = require("express");
const router = express.Router();
const controller = require("../controllers/hargaEmasController");

router.get("/", controller.getHarga);
router.post("/", controller.upsertHarga); // gunakan metode POST untuk tambah/update

module.exports = router;
