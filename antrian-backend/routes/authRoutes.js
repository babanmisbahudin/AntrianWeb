import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userFile = path.join(__dirname, "../data/user.json");

router.post("/login", (req, res) => {
  const { nik, password } = req.body;

  fs.readFile(userFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Gagal membaca file user" });

    const users = JSON.parse(data);
    const user = users.find((u) => u.nik === nik && u.password === password);

    if (!user) {
      return res.status(401).json({ error: "NIK atau password salah" });
    }

    res.json(user);
  });
});

export default router;
