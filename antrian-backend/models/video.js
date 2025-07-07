const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Video", videoSchema);
