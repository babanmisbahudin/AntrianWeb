const mongoose = require("mongoose");

const hargaSchema = new mongoose.Schema({
  berat: { type: String, required: true },
  beli: { type: Number, required: true },
  buyback: { type: Number, required: true },
});

module.exports = mongoose.model("HargaEmas", hargaSchema);
