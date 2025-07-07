const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/user");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Terhubung ke MongoDB");
    seedAdmin();
  })
  .catch((err) => console.error("❌ Gagal terhubung:", err));

async function seedAdmin() {
  try {
    const existing = await User.findOne({ nik: "EPS45359" });
    if (existing) {
      console.log("⚠️ Admin sudah ada.");
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash("Syntax$1", 10);
    await User.create({
      nik: "EPS45359",
      nama: "Admin Utama",
      password: hashedPassword,
      role: "admin",
      cabang: "Majalengka",
      outlet: "Pusat",
      loket: "0" // dummy
    });

    console.log("🎉 Admin berhasil ditambahkan.");
    process.exit();
  } catch (err) {
    console.error("❌ Gagal menyuntikkan admin:", err.message);
    process.exit(1);
  }
}
