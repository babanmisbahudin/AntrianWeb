const mongoose = require("mongoose");

const antrianSchema = new mongoose.Schema({
  nomor: {
    type: Number,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["menunggu", "dipanggil", "selesai"],
    default: "menunggu",
  },
  loket: {
    type: String,
    required: true,
  },
  jenisLayanan: {
    type: String,
    enum: ["penaksir", "kasir", "satpam"],
    required: true,
  },
  waktu: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Antrian", antrianSchema);
