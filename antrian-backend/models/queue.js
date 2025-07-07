const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
  lastKasir: { type: Number, default: 0 },
  lastPenaksir: { type: Number, default: 0 }
});

module.exports = mongoose.model("Queue", queueSchema);
