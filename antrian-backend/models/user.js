const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  nik: {
    type: String,
    required: true,
    unique: true,
  },
  cabang: {
    type: String,
    required: true,
  },
  outlet: {
    type: String,
    required: true,
  },
  loket: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "penaksir", "kasir", "satpam"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // akan otomatis menyimpan createdAt & updatedAt
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
