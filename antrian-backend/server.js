// ⛳ WAJIB paling atas untuk membaca .env
require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const antrianRoutes = require("./routes/antrianRoutes");
const videoRoutes = require("./routes/videoRoutes");
const hargaEmasRoutes = require("./routes/hargaEmasRoutes");
const queueRoutes = require("./routes/queueRoutes");

const app = express();

// 🔌 Koneksi MongoDB
connectDB();

// 🧱 Middleware
app.use(cors());
app.use(express.json());

// 📦 Static file (video promo dll)
app.use("/uploads", express.static("uploads"));

// 📡 Routes utama
app.use("/api/users", userRoutes);               // Login, Register, dll
app.use("/api/antrian", antrianRoutes);          
app.use("/api/video", videoRoutes);              
app.use("/api/harga-emas", hargaEmasRoutes);     
app.use("/api/queue", queueRoutes);              

// 🚀 Mulai server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
